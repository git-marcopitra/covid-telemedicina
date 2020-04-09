export interface UserCredential {
    email: string;
    password: string;
}

export interface User {
    uid?: string;
    email: string;
    name: string;
    password?: string;
    birthYear: string;
    gender: string;
    doc: string;
    phone: string;
    level?: number;
    geo?: {
        lat: number,
        long: number
    }
}