import { useEffect, useState } from "react"
import useAuth from "../context/AuthContext"
import { useNavigate } from "react-router"
import axios from "../lib/axios"
const Home = () => {
let {token,logout}=useAuth()
let [user,setUser]=useState(null)

let fetchUser=async()=>{
  try{
    let res=await axios.get("/users/me",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setUser(res.data)
  }catch(err){
    console.log(err);
  }
}
let navigate=useNavigate()
  useEffect(()=>{
    if(token){
      fetchUser()
    }
  },[token])
  return (
    <div>Hello, {user?(<span>{user.username}</span>):(<span>User</span>)}
    <button onClick={logout}>Logout</button></div>
  )
}
export default Home