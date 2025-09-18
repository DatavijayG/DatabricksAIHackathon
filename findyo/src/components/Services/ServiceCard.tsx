import React from 'react';
import { Service } from '../../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }
        
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }
        
        return stars;
    };

    return (
        <div className="service-card">
            <div className="service-header">
                <h3 className="service-name">{service.name}</h3>
                <div className="service-rating">
                    <div className="stars">
                        {renderStars(service.rating)}
                    </div>
                    <span className="rating-number">({service.rating})</span>
                </div>
            </div>
            <p className="service-summary">{service.summary}</p>
            <div className="service-info">
                <div className="service-cost">
                    <strong>Cost:</strong> {service.cost}
                </div>
                <div className="service-insurance">
                    {service.insuranceAccepted ? '✓ Insurance Accepted' : 'Self-Pay Only'}
                </div>
            </div>
            <div className="service-tags">
                {service.tags.map((tag, index) => (
                    <span key={index} className="service-tag">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;