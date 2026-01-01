import React, {useState} from 'react'

export default function BookingPage({service, onBack, onConfirm}){
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})

  const timeSlots = ['9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM']

  function handleSubmit(e){
    e.preventDefault()
    const newErrors = {}
    if(!date) newErrors.date = 'Please select a date'
    if(!timeSlot) newErrors.timeSlot = 'Please select a time slot'
    if(!name.trim()) newErrors.name = 'Please enter your name'
    if(!phone.trim()) newErrors.phone = 'Please enter your phone number'
    if(!address.trim()) newErrors.address = 'Please enter your address'
    setErrors(newErrors)
    if(Object.keys(newErrors).length === 0){
      onConfirm({service, date, timeSlot, name, phone, address})
    }
  }

  function clearError(field){
    if(errors[field]) setErrors({...errors, [field]: ''})
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="stepper">
          <div className="step active">
            <div className="step-circle">1</div>
            <span>Service</span>
          </div>
          <div className="step active">
            <div className="step-circle">2</div>
            <span>Date & Time</span>
          </div>
          <div className="step active">
            <div className="step-circle">3</div>
            <span>Details</span>
          </div>
          <div className="step">
            <div className="step-circle">4</div>
            <span>Confirm</span>
          </div>
        </div>

        <div className="booking-content">
          <div className="service-card">
            <img src={service.img} alt={service.title} />
            <div className="service-info">
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
              <p className="price">{service.price}</p>
            </div>
          </div>

          <div className="booking-card">
            <h3>Select Date</h3>
            <input
              type="date"
              value={date}
              onChange={e => {setDate(e.target.value); clearError('date')}}
              className="input-field"
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>

          <div className="booking-card">
            <h3>Select Time Slot</h3>
            <div className="time-grid">
              {timeSlots.map(t => (
                <button
                  key={t}
                  className={`time-btn ${timeSlot === t ? 'selected' : ''}`}
                  onClick={() => {setTimeSlot(t); clearError('timeSlot')}}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
          </div>

          <div className="booking-card">
            <h3>Your Details</h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => {setName(e.target.value); clearError('name')}}
                  placeholder="Enter your full name"
                  className="input-field"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => {setPhone(e.target.value); clearError('phone')}}
                  placeholder="Enter your phone number"
                  className="input-field"
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  value={address}
                  onChange={e => {setAddress(e.target.value); clearError('address')}}
                  placeholder="Enter your full address"
                  className="input-field"
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>
              <button type="submit" className="continue-btn">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
      <button className="back-btn" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}