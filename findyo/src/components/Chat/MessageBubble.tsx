import React from 'react';

interface MessageBubbleProps {
    sender: 'user' | 'findyo';
    text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
    return (
        <div className={`message-bubble ${sender}`}>
            <div className="message-sender">
                {sender === 'findyo' ? 'Findyo 🐾' : 'You'}
            </div>
            <div className="message-text">{text}</div>
        </div>
    );
};

export default MessageBubble;