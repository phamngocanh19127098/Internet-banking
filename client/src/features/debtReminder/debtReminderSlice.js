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
        removeDebtReminder: (state, action) => {

            state.debtReminders = state.debtReminders.filter((e) => e.id !== action.payload)
        },
        onInit: (state, action) => {
            state.debtReminders = action.payload
        }
    }
});

export const {addNew, removeDebtReminder, onInit} = debtReminderSlice.actions;

export default debtReminderSlice.reducer;
