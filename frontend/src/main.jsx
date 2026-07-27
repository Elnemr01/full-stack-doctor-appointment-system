import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/api/axiosGlobal'
import './index.css'
import App from './App.jsx'
import UserProvider from './contextAPI/UserProvider'
import { BrowserRouter } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
