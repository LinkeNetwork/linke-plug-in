import React from 'react'
import './styles/index.scss'
import Chat from "./components/chat/index"
import reportWebVitals from "./reportWebVitals"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
// export { default as Chat } from "./components/chat";