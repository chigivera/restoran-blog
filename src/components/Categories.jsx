import React from 'react';

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className='categories ml-2 flex flex-wrap max-w-xs p-6 w-fit bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <span 
                onClick={() => setSelectedCategory('All')} 
                className={`${selectedCategory === 'All' ? 'bg-blue-500' : ''} bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer`}
            >
                All
            </span>
            {categories.map(category => (
                <span 
                    key={category.id} 
                    onClick={() => setSelectedCategory(category.id)} 
                    className={`${selectedCategory === category.id ? 'bg-blue-500' : ''} bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer`}
                >
                    {category.name}
                </span>
            ))}
        </div>
    );
}

export default Categories;
