import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import './ChatInterface.css';

interface ChatInterfaceProps {
    onServiceRequest?: () => void;
    onShowTips?: () => void;
    onHideServices?: () => void;
    showServices?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onServiceRequest, onShowTips, onHideServices, showServices }) => {
    const [messages, setMessages] = useState<{ sender: 'user' | 'findyo'; text: string }[]>([
        {
            sender: 'findyo',
            text: "Hey there! I'm Findyo, your pet travel buddy! 🐕✈️ Whether you're planning a road trip with your furry friend or need to find the perfect pet-friendly hotel, I'm here to help. Tell me about your travel plans!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const userMessage = { sender: 'user' as const, text: inputValue };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputValue('');
            setIsTyping(true);

            // Simulate Findyo's response with pet travel assistance
            setTimeout(() => {
                let findyoResponse = '';
                const lowerInput = inputValue.toLowerCase();
                
                if (lowerInput.includes('hotel') || lowerInput.includes('stay') || lowerInput.includes('accommodation')) {
                    findyoResponse = "Perfect! I can help you find amazing pet-friendly hotels! 🏨🐾 What city are you traveling to? I'll search for the best accommodations that welcome your furry friend with open arms! I can also check for amenities like dog parks, pet spas, and complimentary pet beds!";
                    if (onServiceRequest) setTimeout(onServiceRequest, 1000);
                } else if (lowerInput.includes('vet') || lowerInput.includes('hospital') || lowerInput.includes('sick') || lowerInput.includes('emergency')) {
                    findyoResponse = "Oh no! Don't worry, I've got you covered! 🚑🐕 I can quickly find the nearest pet hospitals and emergency vets in your area. Your pet's health and safety are my top priority! I'll also provide you with their contact info and hours.";
                    if (onServiceRequest) setTimeout(onServiceRequest, 1000);
                } else if (lowerInput.includes('travel') || lowerInput.includes('trip') || lowerInput.includes('vacation')) {
                    findyoResponse = "How exciting! A pet adventure awaits! ✈️🐾 Tell me more about your trip - where are you going, what kind of pet do you have, and what dates? I'll help you plan the perfect pet-friendly getaway with all the essentials!";
                    if (onServiceRequest) setTimeout(onServiceRequest, 500);
                } else if (lowerInput.includes('dog') || lowerInput.includes('cat') || lowerInput.includes('pet')) {
                    findyoResponse = "Aww, I love hearing about pets! 🐕🐱 What kind of adventure are you planning with your furry friend? I can help you find pet-friendly hotels, nearby vets, or share travel tips like packing checklists and safety advice!";
                } else if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('restaurant')) {
                    findyoResponse = "Great question! 🍽️🐕 I can help you find pet-friendly restaurants and cafes where you and your furry companion can dine together. Many places even offer special pet menus and outdoor seating!";
                    if (onServiceRequest) setTimeout(onServiceRequest, 800);
                } else if (lowerInput.includes('park') || lowerInput.includes('play') || lowerInput.includes('exercise')) {
                    findyoResponse = "Exercise is so important for traveling pets! 🌳🎾 I can help you find dog parks, pet-friendly beaches, and hiking trails near your destination. Let's keep those tails wagging!";
                } else if (lowerInput.includes('flight') || lowerInput.includes('airline') || lowerInput.includes('flying')) {
                    findyoResponse = "Flying with pets can be tricky, but I'm here to help! ✈️🐾 I can provide airline pet policies, carrier requirements, and tips for a smooth journey. Which airline are you considering?";
                } else if (lowerInput.includes('breed') || lowerInput.includes('size') || lowerInput.includes('large dog') || lowerInput.includes('small dog')) {
                    findyoResponse = "Great question! 🐕 Different dog breeds have different travel needs! Large breeds need more space and frequent breaks, while small breeds might need carriers for flights. What breed is your furry travel buddy? I can give breed-specific travel advice!";
                } else if (lowerInput.includes('document') || lowerInput.includes('paperwork') || lowerInput.includes('vaccination')) {
                    findyoResponse = "Important question! 📋 For pet travel you'll need: vaccination records, health certificates (for flights), rabies certificates, and sometimes interstate health certificates. I recommend keeping both physical and digital copies. Need help finding a vet for travel docs?";
                } else if (lowerInput.includes('car') || lowerInput.includes('road trip') || lowerInput.includes('driving')) {
                    findyoResponse = "Road trips with pets can be amazing! 🚗🐾 Key tips: use pet seat belts/carriers, never leave pets in hot cars, pack extra water, plan pet-friendly stops every 2-3 hours, and bring motion sickness meds if needed. Where are you driving to?";
                } else if (lowerInput.includes('tips') || lowerInput.includes('advice') || lowerInput.includes('help')) {
                    findyoResponse = "I'd love to share some pet travel wisdom! 🎒🐕 Here are key tips: bring vaccination records, pack familiar items, research pet policies, and always have emergency vet info. Let me show you my complete travel tips guide!";
                    if (onShowTips) setTimeout(onShowTips, 1000);
                } else {
                    findyoResponse = "Hey there! 🐾 I'm here to make traveling with your pet a breeze! Whether you need pet-friendly hotels, emergency vet locations, dining spots, or travel tips, just let me know how I can help you and your furry companion!";
                }
                
                const findyoMessage = { sender: 'findyo' as const, text: findyoResponse };
                setMessages((prevMessages) => [...prevMessages, findyoMessage]);
                setIsTyping(false);
            }, 1500);
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <div className="chat-title-section">
                    <h2>
                        <span className="kibo-name">Findyo</span>
                        <span className="kibo-tagline">: travel. explore. wag.</span>
                    </h2>
                    {showServices && onHideServices && (
                        <button className="back-to-chat-btn" onClick={onHideServices}>
                            Chat Only
                        </button>
                    )}
                    {!showServices && onShowTips && (
                        <button className="tips-btn" onClick={onShowTips}>
                            Travel Tips
                        </button>
                    )}
                </div>
            </div>
            <div className="messages-panel">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} sender={msg.sender} text={msg.text} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
                <div className="quick-actions">
                    <button 
                        className="quick-action-btn" 
                        onClick={() => onServiceRequest && onServiceRequest()}
                    >
                        🏨 Find Hotels
                    </button>
                    <button 
                        className="quick-action-btn" 
                        onClick={() => {
                            const vetMessage = { sender: 'user' as const, text: 'Find emergency vets near me' };
                            setMessages(prev => [...prev, vetMessage]);
                            setInputValue('');
                            if (onServiceRequest) setTimeout(onServiceRequest, 500);
                        }}
                    >
                        🏥 Find Vets
                    </button>
                    <button 
                        className="quick-action-btn" 
                        onClick={() => onShowTips && onShowTips()}
                    >
                        💡 Travel Tips
                    </button>
                </div>
                <div className="input-controls">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Tell me about your pet travel plans..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;