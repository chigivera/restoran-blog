import React, { useContext, useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import Categories from '../components/Categories';
import { BlogContext } from '../context/BlogContext';
import Search from '../components/Search';

const Home = () => {
    const { articles, categories } = useContext(BlogContext);
    const [selectedCategory, setSelectedCategory] = useState('All');
    useEffect(() => {
        console.log(articles)
        return () => {
            
        };
    }, [articles]);
    return (
        <div className='home'>
            <ul className="flex w-full justify-center flex-col-reverse md:flex-row">
                <li className=''>
                    <ArticleList articles={articles} selectedCategory={selectedCategory} />
                </li>
                <li>
                    <div className="md:w-0.5 md:h-full md:bg-slate-400">
                    </div>
                </li>
                <li className=''>
                        <Search/>
                    <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                </li>
            </ul>
        </div>
    );
}

export default Home;
