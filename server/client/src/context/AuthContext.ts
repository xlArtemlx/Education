import { createContext } from "react";

function no() {}

export const AuthContext = createContext({
    token:null,
    userId:null,
    login:no,
    logout:no,
    isAuthenticadet:false
})