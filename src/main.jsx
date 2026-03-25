import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

// Fix for mobile browsers auto-scrolling to wrong position
// Disable browser scroll restoration and scroll to top on fresh page loads
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}
if (!window.location.hash) {
    window.scrollTo(0, 0)
}
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
            <Analytics />
        </ThemeProvider>
    </React.StrictMode>,
)
