import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    debtReceived: [],
    error: null,
    success: false,
}

const debtReceivedSlice = createSlice({
    name: "debtReceived",
    initialState,
    reducers : {
        addNew: (state, action) => {

        },
        remove: (state, action) => {

        },
        onInit: (state, action) => {
            state.debtReminders = action.payload
        }
    }
});

export const {addNew, remove, onInit} = debtReceivedSlice.actions;

export default debtReceivedSlice.reducer;
