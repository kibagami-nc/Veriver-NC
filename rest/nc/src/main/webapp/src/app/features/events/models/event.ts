export interface Event {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    eventDate: string;
    duration: number; // in hours
    maxParticipants: number;
    materialsNeeded: string[];
    organizerId: number;
    status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    participants: number[];
    createdAt: string;
}
