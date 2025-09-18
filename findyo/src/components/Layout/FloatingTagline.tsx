import React from 'react';
import './FloatingTagline.css';

interface FloatingTaglineProps {
    isHidden?: boolean;
}

const FloatingTagline: React.FC<FloatingTaglineProps> = ({ isHidden = false }) => {
    return (
        <div className={`floating-tagline ${isHidden ? 'hidden' : ''}`}>
            <div className="paw-prints">
                <span className="paw">🐾</span>
                <span className="paw">🐾</span>
                <span className="paw">🐾</span>
            </div>
            <p className="tagline-text">
                Where paws meet adventures, and every journey finds its perfect stay...
            </p>
        </div>
    );
};

export default FloatingTagline;
