import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "../models/ISession";
interface SessionState {
    allSessions: [Session] | [],
    session: Session | null,
    loading: boolean
}
const initialState: SessionState = {
    allSessions: [],
    session: {
        _id: "",
        session_time: null,
        session_with: "",
        meeting_notes: [],
        prescription: [],
        is_completed: false
    },
    loading: false
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessions: (state = initialState, action: PayloadAction<SessionState>) => {
            state.allSessions = action.payload.allSessions;
            console.log("session set action: ", action);
            Object.assign(state, action.payload);
        },
    },
});
export const { setSessions } = sessionSlice.actions;
export default sessionSlice.reducer;