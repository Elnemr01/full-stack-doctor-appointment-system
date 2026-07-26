import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/api/axiosGlobal'
import './index.css'
import App from './App.jsx'
import UserProvider from './contextAPI/UserProvider'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
