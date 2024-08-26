export interface UserData {
    _id: string;
    email: string;
    password: string
    //profilePicture: string;
    firstName: string;
    lastName: string;
    type: string;
    role: Role;
    dayStart?: string;
    dayEnd?: string;
    lunchStart?: string;
    lunchEnd?: string;
    slotDuration?: number;
}

export interface Role {
    _id: string;
    name: string;
    privileges: string[]
}