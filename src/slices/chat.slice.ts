import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialization } from "../models/ISpecialization";
import { UserData } from "../models/IUser";
import { UserChatHistory } from "../models/IChatHistory";
interface ChatState {
    allUsers: UserData[] | [],
    selectedUser: UserData | null,
    userChatHistory: UserChatHistory[] | []
}
const initialState: ChatState = {
    allUsers: [],
    selectedUser: null,
    userChatHistory: []
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatState: (state = initialState, action: PayloadAction<ChatState>) => {
            state.allUsers = action.payload.allUsers;
            state.selectedUser = action.payload.selectedUser;
            state.userChatHistory = action.payload.userChatHistory;
            // Object.assign(state, action.payload);
        }
    },
});
export const { setChatState } = chatSlice.actions;
export default chatSlice.reducer;