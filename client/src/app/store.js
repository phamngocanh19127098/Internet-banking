import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/auth/authService'
import debtReminderReducer from "../features/debtReminder/debtReminderSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    debtReminder: debtReminderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
