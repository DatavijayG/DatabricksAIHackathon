import React, { useState } from 'react';
import ChatInterface from '../Chat/ChatInterface';
import ServiceList from '../Services/ServiceList';
import MapContainer from '../Map/MapContainer';
import TravelTips from '../UI/TravelTips';
import VideoBackground from './VideoBackground';
import FloatingTagline from './FloatingTagline';
import '../../styles/globals.css';

const MainLayout: React.FC = () => {
    const [showServices, setShowServices] = useState(false);
    const [showTips, setShowTips] = useState(false);
    
    const handleServiceRequest = () => {
        setShowServices(true);
        setShowTips(false);
    };
    
    const handleShowTips = () => {
        setShowTips(true);
        setShowServices(false);
    };
    
    const handleHideServices = () => {
        setShowServices(false);
        setShowTips(false);
    };
    
    // Mock services data - Pet-friendly travel services
    const mockServices = [
        {
            id: '1',
            name: 'The Pet Palace Hotel',
            rating: 4.8,
            summary: 'Luxury pet-friendly hotel with dog spa and pet sitting services',
            tags: ['Pet Spa', 'Dog Walking', 'Cat Friendly', 'Luxury'],
            cost: '$150-250/night',
            insuranceAccepted: false
        },
        {
            id: '2',
            name: 'Paws & Stay Inn',
            rating: 4.5,
            summary: 'Budget-friendly accommodation with pet play areas and free breakfast',
            tags: ['Budget', 'Play Areas', 'All Pets', 'Free Wifi'],
            cost: '$80-120/night',
            insuranceAccepted: false
        },
        {
            id: '3',
            name: 'Emergency Pet Hospital',
            rating: 4.9,
            summary: '24/7 emergency veterinary care for traveling pets',
            tags: ['24/7', 'Emergency', 'Surgery', 'All Animals'],
            cost: 'Varies',
            insuranceAccepted: true
        },
        {
            id: '4',
            name: 'TravelVet Mobile Clinic',
            rating: 4.7,
            summary: 'Mobile veterinary services that come to your hotel',
            tags: ['Mobile', 'Hotel Visits', 'Checkups', 'Convenient'],
            cost: '$100-200',
            insuranceAccepted: true
        },
        {
            id: '5',
            name: 'Furry Friends Cafe',
            rating: 4.6,
            summary: 'Pet-friendly restaurant with outdoor seating and special pet menu',
            tags: ['Pet Menu', 'Outdoor Seating', 'Dog Treats', 'Cat Friendly'],
            cost: '$15-30 per meal',
            insuranceAccepted: false
        },
        {
            id: '6',
            name: 'Wag & Walk Dog Park',
            rating: 4.4,
            summary: 'Large fenced dog park with agility equipment and water stations',
            tags: ['Off-Leash', 'Agility', 'Water Station', 'Shade'],
            cost: 'Free',
            insuranceAccepted: false
        }
    ];

    return (
        <div className="main-layout">
            {/* Always show video background */}
            <VideoBackground />
            <div className={`layout-container ${showServices || showTips ? 'show-services' : ''}`}>
                <div className="chat-column">
                    <ChatInterface 
                        onServiceRequest={handleServiceRequest}
                        onShowTips={handleShowTips}
                        onHideServices={handleHideServices}
                        showServices={showServices || showTips}
                    />
                </div>
                {showServices && (
                    <>
                        <div className="services-column">
                            <ServiceList services={mockServices} />
                        </div>
                        <div className="map-column">
                            <MapContainer />
                        </div>
                    </>
                )}
                {showTips && (
                    <div className="tips-column">
                        <TravelTips />
                    </div>
                )}
            </div>
            <FloatingTagline isHidden={showServices || showTips} />
        </div>
    );
};

export default MainLayout;