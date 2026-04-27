import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">CareerLens</Link>

      <div className="nav-links">
        <Link 
          to="/jobs" 
          className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
        >
          Jobs
        </Link>
        <Link 
          to="/saved" 
          className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
        >
          Saved
        </Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar