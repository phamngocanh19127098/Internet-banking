import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    debtReminders: [],
    error: null,
    success: false,
}

const debtReminderSlice = createSlice({
    name: "debtReminder",
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

export const {addNew, remove, onInit} = debtReminderSlice.actions;

export default debtReminderSlice.reducer;
