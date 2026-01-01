import React, {useState} from 'react'

export default function SignIn({onSuccess,onCancel}){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  function submit(e){
    e.preventDefault();
    setError('')
    if(!email || !password){ setError('Please enter email and password'); return }
    setLoading(true)
    setTimeout(()=>{
      const users = JSON.parse(localStorage.getItem('users')||'[]')
      const u = users.find(x=>x.email === email)
      if(!u || u.password !== password){
        setError('Invalid email or password')
        setLoading(false)
        return
      }
      localStorage.setItem('currentUser', JSON.stringify({name:u.name,email:u.email}))
      setLoading(false)
      if(onSuccess) onSuccess()
    },600)
  }

  return (
    <div className="container signup-container">
      <div className="auth-card">
        <h2>Sign in to ServiceHub</h2>
        {error && <div className="error">{error}</div>}
        <form className="signup-form" onSubmit={submit}>
          <label>Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label>Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="cta" type="submit" disabled={loading}>{loading? 'Signing in...':'Sign in'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
