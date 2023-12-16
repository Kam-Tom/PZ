import React, { useState } from "react";
import "./ProductFilter.css";

const ProductFilter = ({ categories, onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log("To kATEGORIE", categories);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="product-filter">
            <h2>Filter by Category</h2>
            <button onClick={() => handleCategoryChange(null)} className={selectedCategory === null ? 'active' : ''}>All</button>
            {categories.map((category, index) => (
                <button key={index} onClick={() => handleCategoryChange(category)} className={selectedCategory === null ? 'active' : ''}>{category}</button>
            ))}
        </div>
    );
};

export default ProductFilter;