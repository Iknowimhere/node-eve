import { Navigate } from "react-router"
import useAuth from "../context/AuthContext"
const ProtectedRoute = ({children}) => {
    let {isAuthenticated}=useAuth()
  return (<>
    {isAuthenticated?<>{children}</>:<Navigate to={"/login"}/>}
  </>
  )
}
export default ProtectedRoute