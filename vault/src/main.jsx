import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from './Page/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>,
)
