import {Routes,Route} from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  )
}
export default App