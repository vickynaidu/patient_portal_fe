import { UserData } from "./IUser";

export interface Specialization {
    _id: string;
    doctor: UserData;
    specialization: string;
    start_year: number;
}