import React, {useState} from 'react'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {text:'Hi! How can I help you today?', sender:'bot'}
  ])
  const [input, setInput] = useState('')

  function sendMessage(){
    if(!input.trim()) return
    const newMsgs = [...messages, {text:input, sender:'user'}]
    setMessages(newMsgs)
    setInput('')
    // Simulate AI response
    setTimeout(()=>{
      const responses = [
        'Sure, I can help with booking services.',
        'What service are you looking for?',
        'Let me find the best professional for you.'
      ]
      const randomResp = responses[Math.floor(Math.random()*responses.length)]
      setMessages([...newMsgs, {text:randomResp, sender:'bot'}])
    },1000)
  }

  return (
    <>
      <button className="chatbot-btn" onClick={()=>setOpen(true)}>
        💬
      </button>
      {open && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={()=>setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((m,i)=>(
              <div key={i} className={`message ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message..." onKeyPress={e=>e.key==='Enter'&&sendMessage()} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  )
}