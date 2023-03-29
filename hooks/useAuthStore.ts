import { authApi } from "@/api";
import { AuthState, onChecking, onLogout } from "@/store";
import { RootState } from "@/store/store";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux"

interface ILoginData{
    email:string;
    password:string;
}

export const useAuthStore=()=> {

    // const { status, user, errorMessage } = useSelector( (state: RootState)  => state.auth );

    // const dispatch = useDispatch();

    const startLogin = async (loginData:ILoginData) => {

        const config:AxiosRequestConfig ={
            method: "POST",
            url: 'auth/login',
            headers: {
                  'Content-Type': 'application/json'
            },
            data: JSON.stringify(loginData)
        };
      
        try {

            const response = await authApi(config);
            const {accessToken,refreshToken} = response.data.data;
      
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);

        } catch (err: any) {
      
            const error: AxiosError = err;
            console.log(error.response?.data);
          }
    }

    const startLogout = () => {
        sessionStorage.clear();
        // dispatch(onLogout({}));
    }
    
    return{
        // status,
        // user,
        // errorMessage,

        startLogin,
        startLogout
    }
}