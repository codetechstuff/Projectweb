import React, {useEffect} from 'react'

export default function Toast({message,onClose,timeout=2500}){
  useEffect(()=>{
    if(!message) return
    const t = setTimeout(()=>{ onClose && onClose() }, timeout)
    return ()=>clearTimeout(t)
  },[message,onClose,timeout])

  if(!message) return null
  return (
    <div className="toast">{message}</div>
  )
}
