import {Routes,Route} from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<ProtectedRoute>
        <Home></Home>
      </ProtectedRoute>}></Route>
    </Routes>
  )
}
export default App