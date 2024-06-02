import { useState } from "react";
import PropTypes from 'prop-types';
import "./InputThumbnail.css";
function InputThumbnail({ onChange, className }) {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                onChange(file);
            }
            reader.readAsDataURL(file);
        }

    }

    return (
        <div className={`thumbnail-upload-container ${className}`}>
            <h3>Thumbnail</h3>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="imageUpload" className="image-upload-label">
                {image ? (
                    <div className="image-preview"
                        style={{ backgroundImage: `url(${image})` }} />
                ) : (
                        <ion-icon name="add-circle-outline"></ion-icon>
                )}
            </label>
        </div>
    );
}

InputThumbnail.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};


export default InputThumbnail;