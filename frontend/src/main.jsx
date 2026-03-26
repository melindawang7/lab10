
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AsgardeoProvider } from "@asgardeo/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AsgardeoProvider
      clientId="J1n0WkCbE1_xQRRwCL_A8TZXyq8a"
      baseUrl="https://api.asgardeo.io/t/mis372tsecurity"
      signInRedirectURL="https://lab10-frontend2-d7im.onrender.com"
      signOutRedirectURL="https://lab10-frontend2-d7im.onrender.com"
      scopes="openid profile"
    >
      <App />
    </AsgardeoProvider>
  </StrictMode>
)