import React from 'react';

const TypingIndicator: React.FC = () => {
    return (
        <div className="typing-indicator">
            <span>Kibō is thinking</span>
            <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
            </div>
        </div>
    );
};

export default TypingIndicator;