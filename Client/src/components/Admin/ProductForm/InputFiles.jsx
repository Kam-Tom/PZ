import { useState, useRef } from "react";
import PropTypes from 'prop-types';
import "./InputFiles.css";

function InputFiles({ className, onChange }) {
    const [files, setFiles] = useState([]);
    const [showBubble, setShowBubble] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef(null);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).map(file => ({ file, description: '' }));
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onChange(updatedFiles);
    };

    const handleDescribeFile = (event, index) => {
        const { clientX, clientY } = event;
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollTop = containerRef.current.scrollTop;
        const scrollLeft = containerRef.current.scrollLeft;
        let top = clientY - containerRect.top + scrollTop;
        let left = clientX - containerRect.left + scrollLeft;

        if (top < 0) {
            top = -top;
        }
        if (left < 0) {
            left = -left;
        }


        setBubblePosition({ top, left });
        setShowBubble(true);
        setCurrentFileIndex(index);
    };

    const handleFileRemove = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onChange(updatedFiles);
    };

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        const updatedFiles = files.map((file, i) =>
            i === currentFileIndex ? { ...file, description: value } : file
        );
        setFiles(updatedFiles);
        onChange(updatedFiles);
    };

    const handleBubbleClose = () => {
        setShowBubble(false);
        setCurrentFileIndex(null);
    };

    return (
        <div className={`files-upload-container ${className}`} ref={containerRef}>
            <label htmlFor="file-input" className="upload-label">
                <h1>Add File</h1>
                <ion-icon name="add-circle-outline"></ion-icon>
            </label>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
            />
            <ul>
                {files.map((fileObj, index) => (
                    <li key={index} className="file-item">
                        <ion-icon name="trash-outline" onClick={() => handleFileRemove(index)}></ion-icon>
                        <span
                            className="file-name"
                            onClick={(event) => handleDescribeFile(event, index)}
                        >
                            {fileObj.file.name}
                        </span>
                        {fileObj.description && <span className="file-description">{fileObj.description}</span>}
                    </li>
                ))}
            </ul>
            {showBubble && (
                <div className="speech-bubble" style={{ top: bubblePosition.top, left: bubblePosition.left }}>
                    <textarea
                        value={files[currentFileIndex]?.description || ''}
                        onChange={handleDescriptionChange}
                        placeholder="Add description"
                    />
                    <button onClick={handleBubbleClose}>Close</button>
                </div>
            )}
        </div>
    );
}

InputFiles.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default InputFiles;
