import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    unpaidDebtReminders: [],
    error: null,
    success: false,
}

const unpaidDebtReminderSlice = createSlice({
    name: "unpaidDebtReminder",
    initialState,
    reducers : {
        addNew: (state, action) => {

        },
        remove: (state, action) => {

        },
        onInitUnpaidDebtReminder: (state, action) => {
            state.unpaidDebtReminders = action.payload
        }
    }
});

export const {addNew, remove, onInitUnpaidDebtReminder} = unpaidDebtReminderSlice.actions;

export default unpaidDebtReminderSlice.reducer;
