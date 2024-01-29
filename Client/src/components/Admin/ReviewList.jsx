import React, { useState } from "react";
import DataTable from './DataTable';
import './DataTable.css';
import { getAll, deleteElement } from '../../axios'
import { useEffect } from "react";
function ReviewList() {
    const renderReviewDetails = (data, onDelete) => {
        return <ProductReviews produtId={data.id} />
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
function ProductReviews({ produtId }) {
    const [reviews, setReviews] = useState([]);
    async function fetchReviews() {
        setReviews(await getAll(`https://localhost:7248/api/Review/${produtId}`));
        console.log("DATA ", reviews)

    }
    async function deleteReview(review) {
        await deleteElement(`https://localhost:7248/api/Review/Admin/${review.id}`);
        setReviews((prevReviews) => prevReviews.filter((r) => r.id !== review.id));
        console.log("DELETE ", review);
    }
    useEffect(() => {

        fetchReviews();
    }, []); 
    return (
        <>
            {reviews.map((review) => (
                <div className="review-details" key={review.id}>
                    <div className="review-info">
                        <p>Email: {review.author}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.description}</p>
                    </div>
                    <div>
                        <button className="delete-button" onClick={() => deleteReview(review)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ReviewList;