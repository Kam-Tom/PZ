import React, { useState } from "react";
import "./ProductFilter.css";

const ProductFilter = ({ categories, onSelectCategory, onFilterDiscounted }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showDiscounted, setShowDiscounted] = useState(false);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    const handleDiscountedToggle = () => {
        setShowDiscounted(!showDiscounted);
        onFilterDiscounted(!showDiscounted);
    };

    return (
        <div className="product-filter">
            <h2>Filter by Category</h2>
            <button onClick={() => handleCategoryChange(null)} className={selectedCategory === null ? 'active' : ''}>All</button>
            {/* <button onClick={handleDiscountedToggle} className={showDiscounted ? 'active' : ''}>Discounted</button> */}
            {categories.map((category, index) => (
                <button key={index} onClick={() => handleCategoryChange(category)} className={selectedCategory === null ? 'active' : ''}>{category}</button>
            ))}
        </div>
    );
};

export default ProductFilter;