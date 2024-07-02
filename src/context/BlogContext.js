import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchArticles();
        fetchCategories();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getArticle = (id) => {
        return articles.find(article => article.id === id);
    };

    const searchArticle = (query) => {
         setArticles(articles.filter(article => article.title.includes(query) || article.content.includes(query)));
    };

    const findArticleByCategory = (categoryId) => {
        return articles.filter(article => article.category_id === categoryId);
    };

    const addArticle = async (newArticle) => {
        try {
            const response = await axios.post('http://localhost:4000/articles', newArticle);
            setArticles([...articles, response.data]);
        } catch (error) {
            console.error('Error adding article:', error);
        }
    };

    const addCategory = async (newCategory) => {
        try {
            const response = await axios.post('http://localhost:4000/categories', newCategory);
            setCategories([...categories, response.data]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const removeArticle = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/articles/${id}`);
            setArticles(articles.filter(article => article.id !== id));
        } catch (error) {
            console.error('Error removing article:', error);
        }
    };

    const removeCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error removing category:', error);
        }
    };

    return (
        <BlogContext.Provider value={{
            articles,
            categories,
            getArticle,
            searchArticle,
            findArticleByCategory,
            addArticle,
            addCategory,
            removeArticle,
            removeCategory
        }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogProvider, BlogContext };
