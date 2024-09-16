export interface IMonoCase {
    lat: number;
    lng: number;
    isSent: boolean;
    genre: string;
    age: number;
    creationDate: Date;
}

export interface IMonoDocument extends Document, IMonoCase {}