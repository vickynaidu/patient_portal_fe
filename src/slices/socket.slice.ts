import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Message} from "../models/IMessage"
interface SocketState {
    status: string,
    messageReceived: Message | null
}
const initialState: SocketState = {
    status: "disconnected",
    messageReceived: null
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocketState: (state = initialState, action: PayloadAction<SocketState>) => {
            state.status = action.payload.status;
            state.messageReceived = action.payload.messageReceived;
        }
    },
});
export const { setSocketState } = socketSlice.actions;
export default socketSlice.reducer;