import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/auth/authService'
import debtReminderReducer from "../features/debtReminder/debtReminderSlice"
import debtReceivedReducer from "../features/debtReminder/debtReceivedSlice"
import unpaidDebtReminderReducer from "../features/debtReminder/unpaidDebtReminder"
import notificationReducer from "../features/notification/notificationSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    debtReminder: debtReminderReducer,
    debtReceived: debtReceivedReducer,
    unpaidDebtReminder: unpaidDebtReminderReducer,
    notification : notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
