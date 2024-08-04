import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";

import CartReducer from './features/cartSlice'
import AuthReducer from './features/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig } from "./persistConfig";


const authReducer = combineReducers({ 
  auth : persistReducer(authPersistConfig, AuthReducer)
});


export const store = configureStore({
  reducer : {
    // ProductReducer
    CartReducer ,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools : process.env.NODE_ENV !== 'production'
})




// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

/* export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'] */
