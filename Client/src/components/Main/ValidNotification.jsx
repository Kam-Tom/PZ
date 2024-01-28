import React from 'react';

function ValidationError({ message }) {
    return (
        <div className="error">
            {message}
        </div>
    );
}

export default ValidationError;