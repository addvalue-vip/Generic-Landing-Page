import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <App />
      </Router>
    </ClerkProvider>
  </React.StrictMode>,
)