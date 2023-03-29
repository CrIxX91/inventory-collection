import { createSlice } from '@reduxjs/toolkit';


export interface AuthState {
    status: string;
    user: {};
    errorMessage:undefined| string
  }
  
  const initialState: AuthState = {
        status: 'checking', // 'authenticated','not-authenticated',
        user: {},
        errorMessage: undefined,
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

// export type RootState = ReturnType<typeof authSlice>


export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;