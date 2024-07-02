import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArticles();
        fetchCategories();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
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
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/articles', newArticle);
            setArticles([...articles, response.data]);
        } catch (error) {
            console.error('Error adding article:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (newCategory) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/categories', newCategory);
            setCategories([...categories, response.data]);
        } catch (error) {
            console.error('Error adding category:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeArticle = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/articles/${id}`);
            setArticles(articles.filter(article => article.id !== id));
        } catch (error) {
            console.error('Error removing article:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeCategory = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error removing category:', error);
        } finally {
            setLoading(false);
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
            removeCategory,
            loading
        }}>
            {loading ? <Loading /> : children}
        </BlogContext.Provider>
    );
};

export { BlogProvider, BlogContext };
