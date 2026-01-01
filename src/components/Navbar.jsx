import React, {useState} from 'react'

export default function Navbar({onNavigate}){
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ServiceHub
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('home'); setMenuOpen(false)}}>Home</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('about'); setMenuOpen(false)}}>About</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('plans'); setMenuOpen(false)}}>Plans</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('signin'); setMenuOpen(false)}}>Login/Signup</a>
        </nav>
        <div className="nav-action">
          <button className="cta" onClick={e=>{e.preventDefault(); onNavigate?.('book')}}>Book</button>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
