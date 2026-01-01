import React from 'react'

export default function ServiceCard({service,onBook}){
  return (
    <div className="card">
      <img src={service.img} alt={service.title} />
      <div className="meta"><h4>{service.title}</h4><div className="price">{service.price}</div></div>
      <div>{service.desc}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <small>⭐ {service.rating}</small>
        <button onClick={onBook} className="book-btn">Book</button>
      </div>
    </div>
  )
}
