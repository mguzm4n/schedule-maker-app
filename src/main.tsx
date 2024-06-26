import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CoursesProvider from './hooks/coursesContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CoursesProvider>
      <App />
    </CoursesProvider>
  </React.StrictMode>,
)
