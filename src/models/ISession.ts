interface MeetingNote {
    who: string;
    notes: string;
}

interface Prescription {
    medicine: string;
    type: string;
    before_meal: boolean;
}

export interface Session {
    _id: string;
    session_time: Date | null;
    session_with: string;
    meeting_notes: [MeetingNote] | [];
    prescription: [Prescription] | [];
    is_completed: boolean;
}