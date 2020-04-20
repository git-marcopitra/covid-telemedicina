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

export interface Test{
    result: number;
    travel: boolean;
    people: boolean;
    covid: boolean;
    febre: boolean;
    tosse: boolean;
    fadiga: boolean;
    respiracao: boolean; 
    garganta: boolean;
    calafrios: boolean;
    corpo: boolean; 
    cabeca: boolean;
    coriza:boolean;
    espirros: boolean;
}

export interface AppointmentData{
    preSick: string;
    comment: string;
}