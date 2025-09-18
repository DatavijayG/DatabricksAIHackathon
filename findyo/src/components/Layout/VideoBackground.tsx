import React, { useRef, useEffect, useState } from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Handle video loading
            const handleLoadedData = () => {
                setVideoLoaded(true);
            };

            const handleError = () => {
                setVideoError(true);
            };

            const handleCanPlay = () => {
                // Try to play the video
                video.play().catch(() => {
                    // Fallback: show animated background
                    setVideoError(true);
                });
            };

            // Add event listeners
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
            
            // Ensure smooth looping
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.play().catch(() => setVideoError(true));
            });

            // Cleanup
            return () => {
                video.removeEventListener('loadeddata', handleLoadedData);
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('error', handleError);
            };
        }
    }, []);

    return (
        <div className="video-background">


            {/* Video background - only show if loaded successfully */}
            {!videoError && (
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={`background-video ${videoLoaded ? 'loaded' : 'loading'}`}
                    preload="metadata"
                    poster=""
                >
                    <source src={`https://videos.pexels.com/video-files/8731061/8731061-sd_640_360_25fps.mp4`} type="video/mp4" />
                    <source src="data:video/mp4;base64," type="video/mp4" />
                </video>
            )}
            
            {/* Original animated background as fallback/overlay */}
            <div className={`animated-background ${videoError || !videoLoaded ? 'primary' : 'secondary'}`}>
                <div className="gradient-animation" />
            </div>
            
            <div className="overlay"></div>
        </div>
    );
};

export default VideoBackground;