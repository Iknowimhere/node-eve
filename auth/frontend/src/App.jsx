import {Routes,Route} from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
  )
}
export default App