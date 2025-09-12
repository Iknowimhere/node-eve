import useAuth from "../context/AuthContext"
const Home = () => {
let {name}=useAuth()
  return (
    <div>Hello, {name}</div>
  )
}
export default Home