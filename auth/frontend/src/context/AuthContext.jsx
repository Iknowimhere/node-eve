import { createContext, useContext } from "react";

let AuthContext=createContext()

//auth provider will be wrapped the components inside Auth provider are children
export const AuthProvider=({children})=>{
    return <AuthContext.Provider value={{name:"tony stark"}}>{children}</AuthContext.Provider>
}
//create a custom hook to consume context data using useContext hook
const useAuth=()=>{
    return useContext(AuthContext)
}
export default useAuth;