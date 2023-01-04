import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: true,
    message: "",
    isRead: true,
    success :true,
    currentPaymentDebt : null,
}

const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers: {
        newNotification : (state, action) => {
            state.message = action.payload;
            state.isOpen = false;
            state.isRead = false;
        },
        closeNotification : (state) => {
            state.isOpen = true;
            state.isRead = true;
            state.message = "";
            state.currentPaymentDebt = null;
        },
        updateCurrentDebt : (state, action) => {
            state.currentPaymentDebt = action.payload;
        }
    }
})

export const { newNotification, closeNotification, updateCurrentDebt } = notificationSlice.actions;

export default notificationSlice.reducer