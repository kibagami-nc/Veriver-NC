export interface Report {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    reportType: 'WASTE' | 'CHEMICAL' | 'DEFORESTATION' | 'OTHER';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    status: 'REPORTED' | 'IN_PROGRESS' | 'CLEANED';
    photos: string[];
    userId: number;
    createdAt: string;
    updatedAt: string;
}
