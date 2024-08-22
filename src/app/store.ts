// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/Login.slice';
import sessionReducer from '../slices/session.slice';

export const store = configureStore({
  reducer: {
    loginReducer, 
    sessionReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;