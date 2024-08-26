import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    isAuthenticated: boolean;
    message: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    message: ""
};

export const loginSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            ////console.log("login action: ", action);
            ////console.log("before update: ", state.isAuthenticated, state.message);
            state.isAuthenticated = action.payload.isAuthenticated;
            state.message = action.payload.message;
            ////console.log("after update: ", state.isAuthenticated, state.message);
        },
        clearLoginSession: (state, action: PayloadAction<AuthState>) => {
            ////console.log("logout action: ", action);
            ////console.log("before update: ", state.isAuthenticated, state.message);
            state.isAuthenticated = action.payload.isAuthenticated;
            state.message = action.payload.message;
            ////console.log("after update: ", state.isAuthenticated, state.message);
        },
    },
});
export const { login, clearLoginSession } = loginSlice.actions;
//export const userSelector = (state: RootState) => state.userReducer;
export default loginSlice.reducer;