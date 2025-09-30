const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-link]');

function setActive(hash){
  const target = (hash||'#about').replace('#','');
  pages.forEach(p=>p.classList.toggle('active', p.id===target));
  navLinks.forEach(a=>a.setAttribute('aria-current', a.getAttribute('href')===`#${target}` ? 'page' : 'false'));
  window.scrollTo({top:0, behavior:'smooth'});
}
window.addEventListener('hashchange',()=>setActive(location.hash));
setActive(location.hash);


const io = new IntersectionObserver((entries)=>{
  for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target);} }
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('pointermove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--mx', `${(x*100).toFixed(2)}%`);
    card.style.setProperty('--my', `${(y*0).toFixed(2)}%`);
    const rx = ((0.5 - y) * 2).toFixed(2);
    const ry = ((x - 0.5) * 3).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('pointerleave', ()=>{ card.style.transform=''; });
});

document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('pointermove',(e)=>{
    const r = b.getBoundingClientRect();
    b.style.setProperty('--px', ((e.clientX - r.left)/r.width*100)+'%');
  },{passive:true});
});

document.getElementById('y').textContent=new Date().getFullYear();

(function(){
  const headerEl = document.querySelector('header');
  let lastY = window.scrollY || 0;
  let ticking = false;
  headerEl.classList.add('is-visible');

  function update(){
    const y = window.scrollY || 0;
    const delta = 6;
    if (y > lastY + delta && y > 80){
      headerEl.classList.add('is-hidden');
      headerEl.classList.remove('is-visible');
    } else if (y < lastY - delta){
      headerEl.classList.remove('is-hidden');
      headerEl.classList.add('is-visible');
    }
    lastY = y;
    ticking = false;
  }

  
  window.addEventListener('scroll', function(){
    if(!ticking){
      requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive:true});

  window.addEventListener('hashchange', function(){
    headerEl.classList.remove('is-hidden');
    headerEl.classList.add('is-visible');
  });
})();