const profile_image = document.getElementById("profile_image");
const mail = document.getElementById('mail')

const card2 = document.getElementById("card2");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    profile_image.classList.add("opacity-0", "pointer-events-none");
    document.getElementById('container_mail').classList.add('mr-8')
    document.getElementById('container_mail').classList.add('self-start')
    document.getElementById('box_mail').classList.remove('invisible')
  
  } else {
   
    profile_image.classList.remove("opacity-0", "pointer-events-none");
    document.getElementById('container_mail').classList.remove('mr-8')
    document.getElementById('container_mail').classList.remove('self-start')
    document.getElementById('box_mail').classList.add('invisible')
  }

  let  window_height =  window.innerHeight;
  
  console.log(window.scrollY)
  if(window.scrollY > 600){

    document.querySelector('#title').classList.remove('opacity-0')
    document.querySelector('#title').classList.add('opacity-100')
  }else{
    document.querySelector('#title').classList.add('opacity-0')
    document.querySelector('#title').classList.remove('opacity-100')
  }

  if(window.scrollY > 800){
   
    document.querySelector('.container').classList.remove('opacity-0')
    document.querySelector('.container').classList.add('opacity-100')

  }else{
 
    document.querySelector('.container').classList.add('opacity-0')
    document.querySelector('.container').classList.remove('opacity-100')
  }

  if(window.scrollY > 2200){

    document.getElementById('contact').classList.remove('opacity-0')
    document.getElementById('contact').classList.add('opacity-100')

  }else{
    document.querySelector('#contact').classList.add('opacity-0')
    document.querySelector('#contact').classList.remove('opacity-100')
  }



});


function show_toast(){
  const number = "0182414655"; 
  navigator.clipboard.writeText(number).then(() => {
    const toast = document.getElementById('toast-success');
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}


// ── Skill Drawer ──────────────────────────────────────────────────────────────

const drawerData = {
  'skill-ai':       { label: 'AI Developer',        color: '#facc15', border: 'border-yellow-400', tech: ['YOLO', 'DeepSort', 'Face Recognition'] },
  'skill-backend':  { label: 'Backend Developer',   color: '#60a5fa', border: 'border-blue-400',   tech: ['Laravel', 'PHP', 'MySQL'] },
  'skill-frontend': { label: 'Frontend Developer',  color: '#f472b6', border: 'border-pink-400',   tech: ['JavaScript', 'Tailwind CSS', 'Bootstrap'] },
  'skill-mobile':   { label: 'Mobile Developer',    color: '#4ade80', border: 'border-green-400',  tech: ['Java (Android)'] },
};

const overlay   = document.getElementById('drawer-overlay');
const drawer    = document.getElementById('skill-drawer');
const drawerTitle = document.getElementById('drawer-title');
const drawerTags  = document.getElementById('drawer-tags');
const drawerClose = document.getElementById('drawer-close');
const drawerHandle = document.getElementById('drawer-handle');

function openDrawer(id) {
  const d = drawerData[id];
  if (!d) return;

  drawerTitle.textContent = d.label;
  drawerTitle.style.color = d.color;
  drawerHandle.style.backgroundColor = d.color;

  // build tags
  drawerTags.innerHTML = '';
  d.tech.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    span.style.cssText = `
      display:inline-block;
      padding:6px 16px;
      border-radius:9999px;
      border:1px solid ${d.color};
      color:${d.color};
      font-size:0.9rem;
      font-weight:600;
      background:rgba(0,0,0,0.25);
    `;
    drawerTags.appendChild(span);
  });

  overlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    drawer.style.transform = 'translateY(0)';
  });

  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  overlay.style.opacity = '0';
  drawer.style.transform = 'translateY(100%)';
  document.body.style.overflow = '';
  setTimeout(() => overlay.classList.add('hidden'), 300);
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeDrawer();
});
drawerClose.addEventListener('click', closeDrawer);

// swipe-down to close
let touchStartY = 0;
drawer.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
drawer.addEventListener('touchend', e => {
  if (e.changedTouches[0].clientY - touchStartY > 60) closeDrawer();
}, { passive: true });