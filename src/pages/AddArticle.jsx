import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BlogContext } from '../context/BlogContext';
import Editor from '../components/Editor';
import axios from 'axios';
import CreateCategory from '../components/CreateCategory';

function AddArticle() {
    const [editorContent, setEditorContent] = useState('');
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { addArticle, categories,addCategory } = useContext(BlogContext);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const onSubmit = async (data) => {
        if (!editorContent.trim()) {
            setError("description", {
                type: "manual",
                message: "Description is required."
            });
            return;
        }

        if (!file) {
            setError("file", {
                type: "manual",
                message: "File is required."
            });
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'kjto27ma'); // Replace with your upload preset

            const response = await axios.post('https://api.cloudinary.com/v1_1/dz9rgu2nb/image/upload', formData);
            const imageUrl = response.data.secure_url;
            setImageUrl(imageUrl);

            const combinedData = {
                ...data,
                description: editorContent,
                imageUrl: imageUrl,
                created_at: new Date(),
                updated_at: new Date()
            };

            await addArticle(combinedData);
            // Optionally, redirect or clear the form after successful submission
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="add-article flex w-full justify-center">
            {showModal && <CreateCategory toggleModal={toggleModal} showModal={showModal} addCategory={addCategory} />}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="flex w-full justify-center">
                    <legend className='text-3xl '>Add Article</legend>
                </div>
                <div className='max-w-sm'>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input 
                        {...register("title", { required: "Title is required" })}
                        id="title"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.title && (
                        <div className="text-red-500">{errors.title.message}</div>
                    )}
                </div>
                <div className='max-w-sm'>
                    <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <div className="flex  items-center">
                        <select {...register("category_id", { required: "Category is Required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <button type="button" onClick={toggleModal} className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Add
                        </button>
                    </div>
                    {errors.category_id && (
                        <div className="text-red-500">{errors.category_id.message}</div>
                    )}
                </div>
                <div id="editor" className='max-w-xl'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <Editor
                        initialValue="<p>Hello, World!</p>"
                        onGetContent={(content) => {
                            setEditorContent(content);
                        }}
                    />
                    {errors.description && <div className="text-red-500">{errors.description.message}</div>}
                </div>
                <div className="max-w-sm">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input 
                        {...register("file")}
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {errors.file && <div className="text-red-500">{errors.file.message}</div>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {uploading ? 'Uploading...' : 'Submit Article'}
                </button>
            </form>
        </div>
    );
}

export default AddArticle;
