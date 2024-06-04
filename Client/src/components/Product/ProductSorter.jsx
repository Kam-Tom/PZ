import React from 'react';
import PropTypes from 'prop-types';
import './ProductSorter.css';

const ProductSorter = ({ onSort }) => {
    return (
        <div className="product-sorter">
            <h3>Sort products by:</h3>
            <button onClick={() => onSort('default')}>
                Default
            </button>
            <button onClick={() => onSort('price_asc')}>
                Price (Low to High)
            </button>
            <button onClick={() => onSort('price_desc')}>
                Price (High to Low)
            </button>
            <button onClick={() => onSort('rating_desc')}>
                Rating (Best to Worst)
            </button>
            <button onClick={() => onSort('rating_asc')}>
                Rating (Worst to Best)
            </button>
        </div>
    );
};

ProductSorter.propTypes = {
    onSort: PropTypes.func.isRequired,
};

export default ProductSorter;
