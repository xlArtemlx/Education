import { createContext } from "react";

function no() {}
function non(id:string,token:string):void {}

export const AuthContext = createContext({
    token:null,
    userId:null,
    login:non,
    logout:no,
    isAuth:false
})