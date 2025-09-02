import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import   CustomerManagementProvider  from './context/customerManagementContext.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CustomerManagementProvider>
      <ToastContainer />
    <App />
    </CustomerManagementProvider>
    </BrowserRouter>
  </StrictMode>,
)
