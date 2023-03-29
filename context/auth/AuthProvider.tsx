import {FC,ReactNode,useReducer} from 'react';
import { IUser } from '@/interfaces';
import { AuthContext, authReducer } from './';
import { authApi } from '@/api';
import { AxiosError, AxiosRequestConfig } from 'axios';

export interface AuthState{
    isLoggedIn:boolean;
    user?:IUser;
}

interface Props{
    children:ReactNode,
}

const AUTH_INITIAL_STATE ={
    isLoggedIn:false,
    user:undefined
}

export const AuthProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer,AUTH_INITIAL_STATE);

  const loginUser =async (email:string, password:string):Promise<boolean> => {

    
    try {
        
        const body={
            email,
            password
        }

        const config:AxiosRequestConfig ={
            method: "POST",
            url: 'auth/login',
            headers: {
                  'Content-Type': 'application/json'
            },
            data: JSON.stringify(body)
        };

        const response = await (await authApi(config)).data;
        const {accessToken,refreshToken,username} = response.data;

        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        console.log(response);
        dispatch({type:'[Auth - Login]',payload:username});
        return true

    } catch (error) {
        return false   
    }

  }

  const checkToken = async():Promise<boolean> => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        console.log(accessToken);
        
        if(!accessToken){
            console.log('entra')
            return false
        }

        const config:AxiosRequestConfig ={
            method: "GET",
            url: 'auth/info',
            headers: {
                'Content-Type': 'application/json',
                'x-token':accessToken
            },
        };

        const response = await (await authApi(config)).data;
        console.log('response info',response.username);

        return true
    } catch (error) {
        return false
    }
  }
  const refreshToken = async():Promise<boolean> => {
    
    try {
        const refreshToken = sessionStorage.getItem('accessToken');
        
        if(!refreshToken){
            return false
        }

        const config:AxiosRequestConfig ={
            method: "GET",
            url: 'auth/renew',
            headers: {
                'Content-Type': 'application/json',
                'x-token':refreshToken
            },
        };

        const response = await (await authApi(config)).data;
        console.log(response.data);

        return true
    } catch (error) {
        return false   
    
    }
  }

  return(
    <AuthContext.Provider value={{
        ...state,

        loginUser,
        refreshToken,
        checkToken
    }}>
        {children}
    </AuthContext.Provider>
  )
}
