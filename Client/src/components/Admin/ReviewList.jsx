import React from "react";
import DataTable from './DataTable';
import './DataTable.css';

function ReviewList() {
    const renderReviewDetails = (data, onDelete) => {
        return (
            <div className="review-details">
                <div className="review-info">
                    <p>Email: {data.author}</p>
                    <p>Rating: {data.rating}</p>
                    <p>Comment: {data.comment}</p>
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
                { header: 'Name', field: 'name', className: 'Name' }
            ]}
            renderDetails={renderReviewDetails}
        />
    );
}

export default ReviewList;