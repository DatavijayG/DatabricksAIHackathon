export interface Message {
    id: string;
    sender: 'user' | 'kibo';
    content: string;
    timestamp: Date;
}

export interface Service {
    id: string;
    name: string;
    rating: number;
    summary: string;
    tags: string[];
    cost: string;
    insuranceAccepted: boolean;
}