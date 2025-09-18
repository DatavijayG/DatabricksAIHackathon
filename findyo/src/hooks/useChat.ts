import { useState, useEffect } from 'react';

interface Message {
    id: number;
    sender: 'user' | 'kibo';
    text: string;
}

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async (text: string) => {
        const userMessage: Message = {
            id: messages.length + 1,
            sender: 'user',
            text,
        };
        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);
        // Simulate a response from Kibō
        const response = await fetchKiboResponse(text);
        const kiboMessage: Message = {
            id: messages.length + 2,
            sender: 'kibo',
            text: response,
        };
        setMessages((prev) => [...prev, kiboMessage]);
        setLoading(false);
    };

    const fetchKiboResponse = async (userInput: string): Promise<string> => {
        // Placeholder for actual API call to get response from Kibō
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Kibō's response to: ${userInput}`);
            }, 1000);
        });
    };

    return {
        messages,
        loading,
        sendMessage,
    };
};

export default useChat;