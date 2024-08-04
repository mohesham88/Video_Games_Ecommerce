import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer  from './features/authSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const authPersistConfig = {
  key: "auth",
  storage,
  // blacklist: ["somethingTemporary"],
};

