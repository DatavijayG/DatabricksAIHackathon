import React from 'react';
import './AppStats.css';

interface Stat {
    value: string;
    label: string;
    icon: string;
}

const stats: Stat[] = [
    {
        value: "1000+",
        label: "Pet-Friendly Hotels",
        icon: "🏨"
    },
    {
        value: "500+",
        label: "Veterinary Clinics",
        icon: "🏥"
    },
    {
        value: "200+",
        label: "Pet Restaurants",
        icon: "🍽️"
    },
    {
        value: "150+",
        label: "Dog Parks",
        icon: "🌳"
    }
];

const AppStats: React.FC = () => {
    return (
        <div className="app-stats">
            <h3 className="stats-title">🐾 Findyo Network</h3>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
            <p className="stats-subtitle">Connecting pets and families to amazing travel experiences</p>
        </div>
    );
};

export default AppStats;
