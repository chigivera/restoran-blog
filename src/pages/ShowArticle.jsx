import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { useParams } from 'react-router-dom';

const ShowArticle = () => {
    const { id } = useParams(); // Get article ID from URL params
    const { getArticle } = useContext(BlogContext); // Get getArticle function from BlogContext
    const [article, setArticle] = useState(null); // State to store article details

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleData = await getArticle(id); // Fetch article data using getArticle function
                setArticle(articleData); // Set article state with fetched data
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle(); // Call fetchArticle function on component mount
    }, [getArticle, id]); // Dependency array ensures useEffect runs when getArticle or id changes

    // Placeholder UI until article is fetched
    if (!article) {
        return <div>Loading...</div>;
    }
    console.log(article)
    return (
        <div className='flex w-full justify-center'>
            <ul>
                <li>
                    <p className="text-3xl">{article.title}</p>
                </li>
                <li>
                    <img className="h-auto max-w-full" src={article.imageUrl} alt={article.title} />
                </li>
                <li className='max-w-md'>
                    <p className=''>
                        {article.description}
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default ShowArticle;
