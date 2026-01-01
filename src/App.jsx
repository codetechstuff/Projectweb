import React, {useState} from 'react'
import ServiceCard from './components/ServiceCard'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Toast from './components/Toast'

const initialServices = [
  {id:1,title:'Home Salon',category:'Salon',price:'₹599',rating:4.7,desc:'Experienced stylist at your home',img:'https://source.unsplash.com/collection/190727/400x300'},
  {id:2,title:'Full Home Cleaning',category:'Cleaning',price:'₹899',rating:4.6,desc:'Deep cleaning for 2BHK',img:'https://source.unsplash.com/collection/891/400x300'},
  {id:3,title:'Plumbing Repair',category:'Plumbing',price:'₹499',rating:4.5,desc:'Fix leaks and installations',img:'https://source.unsplash.com/collection/1424340/400x300'},
  {id:4,title:'Electrician Visit',category:'Electrician',price:'₹399',rating:4.4,desc:'Wiring and fixture fixes',img:'https://source.unsplash.com/collection/888146/400x300'}
]

export default function App(){
  const [services] = useState(initialServices)
  const [results, setResults] = useState(initialServices)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState({open:false,service:null})
  const [view, setView] = useState('home')
  const [toast, setToast] = useState('')
  const [currentUser, setCurrentUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('currentUser')) }catch(e){return null}
  })

  const categories = Array.from(new Set(initialServices.map(s=>s.category)))

  function doSearch(){
    const q = query.trim().toLowerCase()
    if(!q) return setResults(services)
    setResults(services.filter(s=>s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)))
  }

  function openBooking(s){ setModal({open:true,service:s}) }
  function closeBooking(){ setModal({open:false,service:null}) }

  function navigate(to){
    setView(to || 'home')
    if(to==='home') setResults(services)
  }

  function onAuthSuccess(){
    const u = JSON.parse(localStorage.getItem('currentUser')||'null')
    setCurrentUser(u)
    setToast('Welcome '+(u?.name||'') )
    setView('home')
  }

  function filterByCategory(cat){ setResults(services.filter(s=>s.category===cat)) }

  if(view==='signup'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <SignUp onSuccess={onAuthSuccess} onCancel={()=>navigate('home')} />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  if(view==='signin'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <SignIn onSuccess={onAuthSuccess} onCancel={()=>navigate('home')} />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  return (
    <div>
      <Navbar onNavigate={navigate} />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Find trusted professionals near you</h1>
            <div className="search-row">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services (e.g., Plumbing, Salon)" />
              <button onClick={doSearch}>Search</button>
            </div>
            <div className="categories" id="categories">
              {categories.map(cat=> (
                <button key={cat} className="cat" onClick={()=>filterByCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="services container">
          <h2>Popular Services</h2>
          <div className="services-grid">
            {results.map(s=> (
              <ServiceCard key={s.id} service={s} onBook={()=>openBooking(s)} />
            ))}
          </div>
        </section>
      </main>

      {modal.open && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button className="modal-close" onClick={closeBooking}>×</button>
            <h3>{modal.service.title}</h3>
            <p>{modal.service.category} • {modal.service.price}</p>
            <form onSubmit={(e)=>{e.preventDefault();alert('Booking request sent');closeBooking();}}>
              <label>Name <input required /></label>
              <label>Phone <input required /></label>
              <button type="submit">Request Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
