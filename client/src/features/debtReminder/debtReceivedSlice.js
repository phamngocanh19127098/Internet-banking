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
        removeReceivedDebt: (state, action) => {
            state.debtReceived = state.debtReceived.filter((e) => e.id !== action.payload)
        },
        onInitReceivedDebt: (state, action) => {
            state.debtReceived = action.payload
        }
    }
});

export const {addNew, removeReceivedDebt, onInitReceivedDebt} = debtReceivedSlice.actions;

export default debtReceivedSlice.reducer;
