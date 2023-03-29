import axios, { AxiosError, AxiosRequestConfig } from "axios";


const authApi = axios.create({
    // baseURL:'http://localhost:4000/api/'
    baseURL:'https://inventory-collection-node.vercel.app/api/'
});

authApi.interceptors.request.use(
    (reponse)=>{
        console.log('🌚 interceptor request')
        return reponse
    },(error)=>{

        const originalRequest = error.config;
        const errMessage = error.response.data.message as string;

        return Promise.reject(error);
    }
);

const getRefreshToken =()=>{
    let refreshToken = null

    if (typeof window !== 'undefined') {
        refreshToken = sessionStorage.getItem('refreshToken');
        // do your stuff with sessionStorage
    }
    
    return refreshToken
}

const config:AxiosRequestConfig ={
    method: "GET",
    url: 'auth/renew',
    headers: {
        'Content-Type': 'application/json',
        'x-token':getRefreshToken()
    },
};

authApi.interceptors.response.use((reponse)=>{
    console.log('🌚 interceptor response')
    
    return reponse
},async (error:any)=>{

    const err:AxiosError = error;

    console.log(err.response?.status);

    const originalRequest = error.config;
    console.log(originalRequest);

    if(err.response?.status === 401 && !originalRequest._retry){
        
        originalRequest._retry = true;
        
        const access_token  = await (await authApi(config)).data;
        const {accessToken}=access_token.data;
        
        console.log(accessToken);
        console.log(config);
        
        sessionStorage.setItem("accessToken", accessToken);
        // originalRequest.
        originalRequest.headers['x-token']=accessToken;
        console.log(originalRequest)
        // console.log(access_token.data.data);
        
        return await authApi(originalRequest);
    }
    // const originalRequest = error.config;
    // const errMessage = error.response.data.message as string;

    return Promise.reject(error);
});

export default authApi;