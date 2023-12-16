import React, { useState } from "react";
import "./ProductFilter.css";

const ProductFilter = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="product-filter">
            <h2>Filter by Category</h2>
            <button onClick={() => handleCategoryChange(null)} className={selectedCategory === null ? 'active' : ''}>All</button>
            <button onClick={() => handleCategoryChange("Phone")} className={selectedCategory === "Phone" ? 'active' : ''}>Phones</button>
            <button onClick={() => handleCategoryChange("Laptop")} className={selectedCategory === "Laptop" ? 'active' : ''}>Laptops</button>
        </div>
    );
};

export default ProductFilter;