import React from 'react'

const categoryIcons = {
  Salon: '💇',
  Plumbing: '🔧',
  Cleaning: '🧹',
  Electrician: '⚡',
  Carpenter: '🔨'
}

export default function ServiceCard({service,onBook}){
  const icon = categoryIcons[service.category] || '🛠️'
  return (
    <div className="card">
      <img src={service.img} alt={service.title} />
      <div className="meta"><h4>{icon} {service.title}</h4><div className="price">{service.price}</div></div>
      <div>{service.desc}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <small>⭐ {service.rating}</small>
        <button onClick={onBook} className="book-btn">Book</button>
      </div>
    </div>
  )
}
