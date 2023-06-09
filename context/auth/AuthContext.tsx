import { IUser } from "@/interfaces";
import { createContext } from "react";

interface ContextProps{
    isLoggedIn:boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
    checkToken: () => Promise<boolean>;
}


export const AuthContext = createContext({}as ContextProps);