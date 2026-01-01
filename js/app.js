const services = [
  {id:1,title:'Home Salon',category:'Salon',price:'₹599',rating:4.7,desc:'Experienced stylist at your home',img:'https://source.unsplash.com/collection/190727/400x300'},
  {id:2,title:'Full Home Cleaning',category:'Cleaning',price:'₹899',rating:4.6,desc:'Deep cleaning for 2BHK',img:'https://source.unsplash.com/collection/891/400x300'},
  {id:3,title:'Plumbing Repair',category:'Plumbing',price:'₹499',rating:4.5,desc:'Fix leaks and installations',img:'https://source.unsplash.com/collection/1424340/400x300'},
  {id:4,title:'Electrician Visit',category:'Electrician',price:'₹399',rating:4.4,desc:'Wiring and fixture fixes',img:'https://source.unsplash.com/collection/888146/400x300'}
];

function renderServices(list){
  const container = document.getElementById('services');
  container.innerHTML = '';
  list.forEach(s=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${s.img}" alt="${s.title}" />
      <div class="meta"><h4>${s.title}</h4><div class="price">${s.price}</div></div>
      <div>${s.desc}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <small>⭐ ${s.rating}</small>
        <button data-id="${s.id}" class="book-btn">Book</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openModal(service){
  const modal = document.getElementById('booking-modal');
  document.getElementById('modal-title').textContent = `Book: ${service.title}`;
  document.getElementById('modal-desc').textContent = `${service.category} • ${service.price} • ${service.desc}`;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  document.getElementById('booking-modal').setAttribute('aria-hidden','true');
}

document.addEventListener('click',e=>{
  if(e.target.matches('.book-btn')){
    const id = Number(e.target.dataset.id);
    const s = services.find(x=>x.id===id);
    if(s) openModal(s);
  }
});

document.getElementById('modal-close').addEventListener('click',closeModal);
document.getElementById('booking-form').addEventListener('submit',e=>{e.preventDefault();alert('Booking request sent!');closeModal();});

// search and category filtering
document.getElementById('search-btn').addEventListener('click',()=>{
  const q = document.getElementById('search').value.trim().toLowerCase();
  renderServices(services.filter(s=>s.title.toLowerCase().includes(q)||s.category.toLowerCase().includes(q)));
});

document.querySelectorAll('.categories .cat').forEach(btn=>btn.addEventListener('click',e=>{
  const cat = e.target.textContent.trim();
  renderServices(services.filter(s=>s.category===cat));
}));

// initial render
renderServices(services);
