import { Route, Routes } from 'react-router'
import './App.css'
import UserRoutes from './protectedRoutes/UserRoutes'
import LoggedRoutes from './protectedRoutes/LoggedRoutes'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

  return (
    <div className="App">
      <Routes>
        {/* user routes - wrapper without path */}
        <Route element={<UserRoutes/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>

        {/* logged-in routes - wrapper without path */}
        <Route element={<LoggedRoutes/>}>
          <Route path='/' element={<h1>doctor appointment system</h1>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App