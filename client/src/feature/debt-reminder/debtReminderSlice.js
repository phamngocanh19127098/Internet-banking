import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    amount : 0,
    isLoading : true,
}

const debtReminderSlice = createSlice({
    name: "debtReminder",
    initialState,
    reducers : {
        addNew: (state, action) => {
            state.items.push(action.payload);
            state.isLoading = false
            state.amount = state.amount + 1;
        },
        remove: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.isLoading = false;
            state.amount = state.amount - 1;
        },
        onInit: (state, action) => {
            console.log(action);
            state.items = action.payload;
            state.isLoading = false;
            state.amount = 0;
        }
    }
});

export const {addNew, remove, onInit} = debtReminderSlice.actions;

export default debtReminderSlice.reducer;
