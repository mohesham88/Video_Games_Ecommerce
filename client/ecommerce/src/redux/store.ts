import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import CartReducer from './features/cartSlice'
import AuthReducer from './features/authSlice'
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer : {
    // ProductReducer,
    CartReducer ,
    auth : AuthReducer,

  },
  
  devTools : process.env.NODE_ENV !== 'production'
})


export const makeStore = () => {
  return store;
}


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

/* export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'] */
