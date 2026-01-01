import React, {useState} from 'react'

export default function SignUp({onSuccess,onCancel}){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [showPwd,setShowPwd] = useState(false)

  function validate(){
    if(!name.trim()) return 'Please enter your name'
    if(!email.includes('@')) return 'Enter a valid email'
    if(password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  function submit(e){
    e.preventDefault()
    setError('')
    const err = validate()
    if(err){ setError(err); return }
    setLoading(true)
    setTimeout(()=>{
      const users = JSON.parse(localStorage.getItem('users')||'[]')
      if(users.find(u=>u.email===email)){
        setError('An account with this email already exists')
        setLoading(false)
        return
      }
      users.push({name, email, password})
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify({name,email}))
      setLoading(false)
      if(onSuccess) onSuccess()
    },800)
  }

  function passwordStrength(){
    if(password.length > 10) return 'strong'
    if(password.length >=6) return 'medium'
    return 'weak'
  }

  return (
    <div className="container signup-container">
      <div className="auth-card">
        <h2>Create your ServiceHub account</h2>
        {error && <div className="error">{error}</div>}
        <form className="signup-form" onSubmit={submit}>
          <label>Name
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required />
          </label>
          <label>Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
          </label>
          <label>Password
            <div style={{position:'relative'}}>
              <input type={showPwd? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password" required />
              <button type="button" className="toggle-pwd" onClick={()=>setShowPwd(s=>!s)}>{showPwd? 'Hide':'Show'}</button>
            </div>
            <small className={`pwd-${passwordStrength()}`}>Strength: {passwordStrength()}</small>
          </label>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="cta" type="submit" disabled={loading}>{loading? 'Creating...':'Sign up'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
