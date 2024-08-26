import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialization } from "../models/ISpecialization";
interface SpecializationState {
    allSpecializations: [Specialization] | [],
    specialization: Specialization | null,
    loading: boolean
}
const initialState: SpecializationState = {
    allSpecializations: [],
    specialization: null,
    loading: false
};

export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setSpecialization: (state = initialState, action: PayloadAction<SpecializationState>) => {
            state.allSpecializations = action.payload.allSpecializations;
            // Object.assign(state, action.payload);
        }
    },
});
export const { setSpecialization } = doctorSlice.actions;
export default doctorSlice.reducer;