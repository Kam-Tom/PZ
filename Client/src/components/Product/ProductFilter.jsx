import React, { useState } from "react";
import PropTypes from 'prop-types';
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
            <h2>Filter discounted products</h2>
            <button onClick={handleDiscountedToggle} className={showDiscounted ? 'active' : ''}>Discounted</button>
            <h2>Filter by Category</h2>
            <button onClick={() => handleCategoryChange(null)} className={selectedCategory === null ? 'active' : ''}>All</button>
            {categories.map((category, index) => (
                <button key={index} onClick={() => handleCategoryChange(category)} className={selectedCategory === null ? 'active' : ''}>{category}</button>
            ))}
        </div>
    );
};

ProductFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectCategory: PropTypes.func.isRequired,
    onFilterDiscounted: PropTypes.func.isRequired,
};

export default ProductFilter;