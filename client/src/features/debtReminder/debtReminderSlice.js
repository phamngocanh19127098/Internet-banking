import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    debtReminders: [],
    error: null,
    success: false,
}

const debtReminder = createSlice({
    name : 'debtReminder',
    initialState,
    reducers: {

    }
})

// export const
export default debtReminder.reducer;