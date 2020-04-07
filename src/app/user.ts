export interface UserCredential {
    email: string;
    password: string;
}

export interface User {
    email: string;
    name: string;
    password?: string;
    birthYear: string;
    gender: string;
    doc: string;
    phone: string;
    geoLocation?: {
        lat: number,
        long: number
    }
}