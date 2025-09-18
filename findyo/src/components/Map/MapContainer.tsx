import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};

// Mock markers - these would come from your backend in a real implementation
const mockMarkers = [
    {
        id: 1,
        position: { lat: 37.7849, lng: -122.4094 },
        title: 'The Pet Palace Hotel',
        type: 'hotel'
    },
    {
        id: 2,
        position: { lat: 37.7649, lng: -122.4194 },
        title: 'Paws & Stay Inn',
        type: 'hotel'
    },
    {
        id: 3,
        position: { lat: 37.7749, lng: -122.4294 },
        title: 'Emergency Pet Hospital',
        type: 'vet'
    },
    {
        id: 4,
        position: { lat: 37.7549, lng: -122.4094 },
        title: 'TravelVet Mobile Clinic',
        type: 'vet'
    },
    {
        id: 5,
        position: { lat: 37.7649, lng: -122.4294 },
        title: 'Furry Friends Cafe',
        type: 'restaurant'
    },
    {
        id: 6,
        position: { lat: 37.7849, lng: -122.4194 },
        title: 'Wag & Walk Dog Park',
        type: 'park'
    }
];

const MapContainer: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const onLoad = useCallback((map: google.maps.Map) => {
        // Map instance loaded - could be used for custom styling or event handling
        console.log('Map loaded:', map);
        setIsLoaded(true);
    }, []);

    const onUnmount = useCallback(() => {
        // Clean up if needed
        setIsLoaded(false);
    }, []);

    const onLoadScript = useCallback(() => {
        console.log('Google Maps script loaded');
    }, []);

    const onLoadError = useCallback((error: Error) => {
        console.error('Error loading Google Maps:', error);
    }, []);

    // Environment variable handling - works with both local .env and GitHub Secrets
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
        console.log('🗺️ Google Maps API Key status:', API_KEY ? 'Present' : 'Missing');
    }

    if (!API_KEY || API_KEY === 'your_google_maps_api_key_here' || API_KEY === 'your_new_api_key_here') {
        return (
            <div style={containerStyle} className="map-placeholder">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    background: 'linear-gradient(135deg, #E8F4FD, #F0E8FF)',
                    color: '#666',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div>
                        <h3 style={{ color: 'var(--findyo-color)', marginBottom: '10px' }}>
                            🗺️ Pet Travel Map
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            🏨 Pet-friendly hotels and 🏥 veterinary services will appear here<br/>
                            (Google Maps API key needed)
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <LoadScript 
            googleMapsApiKey={API_KEY}
            onLoad={onLoadScript}
            onError={onLoadError}
            loadingElement={
                <div style={containerStyle}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        background: 'linear-gradient(135deg, #E8F4FD, #F0E8FF)',
                        color: '#666',
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        <div>
                            <h3 style={{ color: 'var(--findyo-color)', marginBottom: '10px' }}>
                                🐾 Loading Pet Travel Map...
                            </h3>
                            <p style={{ margin: 0, fontSize: '14px' }}>
                                Finding pet-friendly places near you!
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {isLoaded && mockMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        title={marker.title}
                        icon={{
                            url: marker.type === 'hotel' ? 
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMiIgZmlsbD0iI0ZGNkIzNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTkgMThoMTJtLTYtNmgwdjEyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==' :
                                marker.type === 'vet' ?
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMiIgZmlsbD0iIzZCQ0Y3RiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEyIDEyaDZtLTMtM3Y2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==' :
                                marker.type === 'restaurant' ?
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMiIgZmlsbD0iI0ZGRDkzRCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTMgMTZoNGwtMSAzaC0ybC0xLTN6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==' :
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxMiIgZmlsbD0iIzRFQ0RDNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEwIDEyaDEwdjZIMTB2LTZ6IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjE0IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTQiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+'
                        }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;