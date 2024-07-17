import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "next/headers";
import Cookies from 'js-cookie'
import { AppThunk } from "../store";


interface AuthState {
  isAuthenticated : boolean,
}

const initialState : AuthState = {
  isAuthenticated : false,
}


const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers : {
    setAuth : (state , action : PayloadAction<boolean> ) => {
      state.isAuthenticated = action.payload;
    }
  }
})

export const {setAuth} = authSlice.actions;

export const checkAuth = (): AppThunk => (dispatch) => {
  const token = Cookies.get('accessToken');
  dispatch(setAuth(!!token));
};
export default authSlice.reducer;