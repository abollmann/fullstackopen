import React from 'react'
import './index.css'


const Message = ({message, className}) => {
    if (message === null)
        return null

    return (
        <div className={`message ${className}`}>
            <h2>{message}</h2>
        </div>
    )
};

export default Message;
