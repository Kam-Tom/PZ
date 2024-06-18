import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./ProductFilter.css";

const ProductFilter = ({ categories, subCategory, onSelectCategory, onSelectSubCategory, onFilterDiscounted, onFilterPriceRange, onFilterStock }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [stockFilter, setStockFilter] = useState('all');
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [subCategorySelectet, setsubCategorySelectet] = useState('');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };
    const handleSubCategoryChange = (sub) => {
        setsubCategorySelectet(sub);
        onSelectSubCategory(sub);
        
    };

    const handleDiscountedToggle = () => {
        setIsDiscounted(true);
        onFilterDiscounted(true);
    };

    const handleAllToggle = () => {
        setIsDiscounted(false);
        onFilterDiscounted(false);
    };

    const handlePriceChange = () => {
        onFilterPriceRange([Number(minPrice), Number(maxPrice)]);
    };

    const handleStockFilterChange = (filter) => {
        setStockFilter(filter);
        switch (filter) {
            case 'inStock':
                onFilterStock(true, false);
                break;
            case 'outOfStock':
                onFilterStock(false, true);
                break;
            case 'all':
            default:
                onFilterStock(undefined, undefined);
                break;
        }
    };

    const handleReset = () => {
        setSelectedCategory(null);
        setMinPrice('');
        setMaxPrice('');
        setStockFilter('all');
        setIsDiscounted(false);
        onSelectCategory(null);
        onFilterDiscounted(false);
        onFilterPriceRange([undefined, undefined]);
        onFilterStock(undefined, undefined);
    };

    return (
        <div className="product-filter">
            <h2>Filter discounted products</h2>
            <button onClick={handleAllToggle} className={!isDiscounted ? 'active' : ''}>All</button>
            <button onClick={handleDiscountedToggle} className={isDiscounted ? 'active' : ''}>Discounted</button>
            <h2>Filter by category</h2>
            <button onClick={() => handleCategoryChange(null)} className={selectedCategory === null ? 'active' : '' }>All</button>
            {categories.map((category, index) => (
    <div key={index}>
        <button onClick={() => handleCategoryChange(category)} className={selectedCategory === category ? 'active' : ''}>{category}</button>
        {selectedCategory === category && subCategory[category].map((sub, subIndex) => (
            <button key={subIndex} onClick={() => handleSubCategoryChange(sub) } className={subCategorySelectet === sub ? 'active' : ''}>{sub}</button>
        ))}
    </div>
))}
            <h2>Filter by price range</h2>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} onBlur={handlePriceChange} placeholder="Min price" />
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} onBlur={handlePriceChange} placeholder="Max price" />
            <h2>Filter by stock</h2>
            <button onClick={() => handleStockFilterChange('all')} className={stockFilter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => handleStockFilterChange('inStock')} className={stockFilter === 'inStock' ? 'active' : ''}>In Stock</button>
            <button onClick={() => handleStockFilterChange('outOfStock')} className={stockFilter === 'outOfStock' ? 'active' : ''}>Out of Stock</button>
            <h2>Reset filters</h2>
            <button onClick={handleReset}>Reset filters</button>
        </div>
    );
};

ProductFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectCategory: PropTypes.func.isRequired,
    onFilterDiscounted: PropTypes.func.isRequired,
    onFilterPriceRange: PropTypes.func.isRequired,
    onFilterStock: PropTypes.func.isRequired,
};

export default ProductFilter;