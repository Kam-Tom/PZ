import React from "react";
import DataTable from './DataTable';
import './DataTable.css';


function ProductList() {
    const renderProductDetails = (data, onDelete) => {
        const shortDescription = data.description.length > 200 
            ? data.description.substring(0, 300) + '...' 
            : data.description;

        return (
            <div className="product-details">
                <div className="product-info">
                    <p>Name: {data.name}</p>
                    <p>Category: {data.category}</p>
                    <p>Price: {data.price}</p>
                    <p>Stock: {data.stock}</p>
                    <p style={{whiteSpace: 'pre-wrap'}}>Description: {shortDescription}</p>
                </div>
                <div>
                    <button className="delete-button" onClick={() => onDelete(data.id)}>Delete</button>
                </div>
            </div>
        );
    };

    return (
        <DataTable 
            apiGetEndpoint="https://localhost:7248/Product/Admin" 
            apiDeleteEndpoint="https://localhost:7248/Product/" 
            columns={[
                { header: 'Name', field: 'name', className: 'Name' },
                { header: 'Category', field: 'category', className: 'Category' },
                { header: 'Price', field: 'price', className: 'Price' },
                { header: 'Availability', field: 'stock', className: 'Availability' }
            ]}
            renderDetails={renderProductDetails}
        />
    );
}

export default ProductList;