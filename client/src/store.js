import { configureStore } from "@reduxjs/toolkit";
import detbReminderReducer from "./feature/debt-reminder/debtReminderSlice"

export default configureStore( {
    reducer: {
        debtReminder: detbReminderReducer
    }
})