import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainPage from './components/Main/MainPage.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);