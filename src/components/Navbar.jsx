import React from 'react'

export default function Navbar({onNavigate}){
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">ServiceHub</div>
        <nav className="nav-links">
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('home')}}>How it works</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('become')}}>Become a Pro</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('signin')}}>Sign in</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate?.('signup')}}>Sign up</a>
        </nav>
        <div className="nav-action">
          <button className="cta" onClick={e=>{e.preventDefault(); onNavigate?.('book')}}>Book a Service</button>
        </div>
      </div>
    </header>
  )
}
