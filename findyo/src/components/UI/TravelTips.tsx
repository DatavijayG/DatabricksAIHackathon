import React, { useState } from 'react';
import './TravelTips.css';

interface TravelTip {
    id: number;
    title: string;
    content: string;
    category: 'preparation' | 'travel' | 'accommodation' | 'emergency';
    emoji: string;
}

const travelTips: TravelTip[] = [
    {
        id: 1,
        title: "Pack a Pet Travel Kit",
        content: "Include vaccination records, medications, favorite toys, blankets, food, water bowls, and waste bags. Don't forget a first-aid kit!",
        category: "preparation",
        emoji: "🎒"
    },
    {
        id: 2,
        title: "Research Pet Policies",
        content: "Check airline, hotel, and restaurant pet policies in advance. Some places have weight limits, breed restrictions, or additional fees.",
        category: "preparation",
        emoji: "📋"
    },
    {
        id: 3,
        title: "Keep Emergency Contacts",
        content: "Save local emergency vet numbers, your regular vet's contact, and poison control hotline. Store them in your phone and on paper.",
        category: "emergency",
        emoji: "🚨"
    },
    {
        id: 4,
        title: "Plan Rest Stops",
        content: "For road trips, plan stops every 2-3 hours for bathroom breaks, water, and exercise. Look for pet-friendly rest areas.",
        category: "travel",
        emoji: "🛑"
    },
    {
        id: 5,
        title: "Book Pet-Friendly Rooms",
        content: "Request ground floor rooms for easy access, check for pet amenities, and ask about pet-proofing. Some hotels offer special pet packages!",
        category: "accommodation",
        emoji: "🏨"
    },
    {
        id: 6,
        title: "Microchip & ID Tags",
        content: "Ensure your pet's microchip info is current and they're wearing ID tags with your travel contact number, not just home info.",
        category: "preparation",
        emoji: "🏷️"
    }
];

const TravelTips: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredTips = selectedCategory === 'all' 
        ? travelTips 
        : travelTips.filter(tip => tip.category === selectedCategory);

    const categories = [
        { value: 'all', label: 'All Tips', emoji: '🎯' },
        { value: 'preparation', label: 'Preparation', emoji: '📝' },
        { value: 'travel', label: 'Travel', emoji: '✈️' },
        { value: 'accommodation', label: 'Hotels', emoji: '🏨' },
        { value: 'emergency', label: 'Emergency', emoji: '🚨' }
    ];

    return (
        <div className="travel-tips">
            <div className="tips-header">
                <h3>🐾 Pet Travel Tips</h3>
                <p>Essential advice for traveling with your furry friends</p>
            </div>
            
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category.value}
                        className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.value)}
                    >
                        {category.emoji} {category.label}
                    </button>
                ))}
            </div>

            <div className="tips-list">
                {filteredTips.map(tip => (
                    <div key={tip.id} className="tip-card">
                        <div className="tip-header">
                            <span className="tip-emoji">{tip.emoji}</span>
                            <h4 className="tip-title">{tip.title}</h4>
                        </div>
                        <p className="tip-content">{tip.content}</p>
                        <span className={`tip-category ${tip.category}`}>
                            {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelTips;
