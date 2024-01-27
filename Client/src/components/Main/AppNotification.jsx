import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const AppNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="notification">
            {message}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

AppNotification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AppNotification;