// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login.slice';
import sessionReducer from '../slices/session.slice';
import doctorReducer from '../slices/doctor.slice';
import chatReducer from '../slices/chat.slice';
import socketReducer from '../slices/socket.slice';

export const store = configureStore({
  reducer: {
    loginReducer, 
    sessionReducer,
    doctorReducer,
    chatReducer,
    socketReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;