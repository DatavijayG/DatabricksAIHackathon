import axios from 'axios';

const API_BASE_URL = 'http://your-backend-url/api'; // Replace with your actual backend URL

// Function to fetch chat responses from the backend
export const fetchChatResponse = async (userMessage: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, { message: userMessage });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat response:', error);
        throw error;
    }
};

// Function to fetch available services from the backend
export const fetchServices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};