import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import "./ReviewsProduct.css";

const ReviewsProduct = ({ reviews, onAddReview, users }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productReviews, setProductReviews] = useState(reviews.filter(item => item.productId === parseInt(id)));
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    Modal.setAppElement('#root');

    

    const handleAddReview = () => {
        if (rating === 0 || comment.trim() === "") {
            alert("Please provide a rating and comment before submitting.");
            return;
        }

        const newReview = {
            rating,
            comment,
            productId: parseInt(id),
            userId: 1,// aktualnie zalogowany użytkownik
        };

        setProductReviews(prevReviews => [newReview, ...prevReviews]);
        onAddReview(newReview);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setRating(0);
        setComment("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="ReviewsProduct">
            <h1>Reviews</h1>
            <button className="add-review-btn" onClick={openModal}>Add Review</button>

            {/* Wyświetlanie recenzji */}
            <div>
            {productReviews.map((review, index) => (
    <div key={index}>
        {/* Check if the user with the specified id is found */}
        {users.find(user => user.id === review.userId) ? (
            <div className="OneReview">
                <p>User: {users.find(user => user.id === review.userId).Username}</p>
                {/* Dodanie gwiazdek */}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((value, idx) => (
                        <label key={idx} className={value <= review.rating ? "star-filled" : ""}>
                            {value <= review.rating ? "★" : ""}
                        </label>
                    ))}
                </div>
                <p>Comment: {review.comment}</p>
            </div>
        ) : (
            null
        )}
    </div>
))}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Review Modal"
                overlayClassName="ReactModal__Overlay"
                className="ReactModal__Content"
            >
                <h2>Add Review</h2>
                <label>Rating:</label>
                <div className="star-rating" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((value, index) => (
                        <label
                            key={index}
                            onMouseEnter={() => setHoverRating(value)}
                            onClick={() => setRating(value)}
                            className={value <= (hoverRating || rating) ? "star-filled" : ""}
                        >
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                style={{ display: "none" }}
                            />
                            {value <= (hoverRating || rating) ? "★" : "☆"}
                        </label>
                    ))}
                </div>
                <p>Comment:</p>
                <textarea className="review-textarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button className="add-review-modal-btn" onClick={handleAddReview}>Add Review</button>
                <button className="cancel-review-modal-btn" onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default ReviewsProduct;
