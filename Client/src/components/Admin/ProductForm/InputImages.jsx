import { useState } from "react";
import PropTypes from 'prop-types';
import "./InputImages.css";

function InputImages({ className, onChange }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        const updatedImages = [...images, ...newImages];

        setImages(updatedImages);

        onChange(updatedImages.map(image => image.file));
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        onChange(newImages.map(image => image.file));
    };

    return (
        <div className={`images-upload-container ${className}`}>
            <label htmlFor="images-input" className="upload-label">
                <h1>Add Image</h1>
                <ion-icon name="add-circle-outline"></ion-icon>
            </label>
            <input
                type="file"
                multiple
                id="images-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
            <div className="upload-images-wrapper">
                {images.map((image, index) => (
                    <div key={index} className="image-preview" style={{ backgroundImage: `url(${image.url})` }}>
                        <ion-icon name="trash-outline" onClick={() => handleImageRemove(index)}></ion-icon>
                    </div>
                ))}
            </div>
        </div>
    );
}

InputImages.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default InputImages;
