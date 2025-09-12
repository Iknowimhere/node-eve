import { createContext, useContext, useEffect, useState } from "react";
let AuthContext=createContext()

//auth provider will be wrapped the components inside Auth provider are children
export const AuthProvider=({children})=>{
    let [token,setToken]=useState(()=>{
        let res=localStorage.getItem("token")|| null
        return res;
    })

    useEffect(()=>{
        if(token){
            localStorage.setItem("token",token)
        }
    },[token])

    let logout=()=>{
        if(token){
            localStorage.removeItem("token")
            setToken(null)
        }
    }

    let isAuthenticated=!!token

    return <AuthContext.Provider value={{token,setToken,logout,isAuthenticated}}>{children}</AuthContext.Provider>
}
//create a custom hook to consume context data using useContext hook
const useAuth=()=>{
    return useContext(AuthContext)
}
export default useAuth;