import { Route, Routes } from 'react-router'
import './App.css'
import UserRoutes from './protectedRoutes/UserRoutes'
import LoggedRoutes from './protectedRoutes/LoggedRoutes'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home/Home'
import Callback from './pages/auth/Callback'

function App() {

  return (
    <div className="App">
      <Toaster/>
      <Routes>
        {/* user routes - wrapper without path */}
        <Route element={<UserRoutes/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/callback' element={<Callback/>}/>
        </Route>

        {/* logged-in routes - wrapper without path */}
        <Route element={<LoggedRoutes/>}>
          <Route index path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App