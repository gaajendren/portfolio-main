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


// ── Skill Drawer ────────────────────────────────────────────────────────────

const drawerData = {
  'skill-ai':       { label: 'AI Developer',       color: '#facc15', tech: ['YOLO', 'DeepSort', 'Face Recognition'] },
  'skill-backend':  { label: 'Backend Developer',  color: '#60a5fa', tech: ['Laravel', 'PHP', 'MySQL'] },
  'skill-frontend': { label: 'Frontend Developer', color: '#f472b6', tech: ['JavaScript', 'Tailwind CSS', 'Bootstrap'] },
  'skill-mobile':   { label: 'Mobile Developer',   color: '#4ade80', tech: ['Java (Android)'] },
};

const overlay     = document.getElementById('drawer-overlay');
const drawer      = document.getElementById('skill-drawer');
const drawerTitle = document.getElementById('drawer-title');
const drawerTags  = document.getElementById('drawer-tags');
const drawerClose = document.getElementById('drawer-close');
const drawerHandle= document.getElementById('drawer-handle');

// Heights as % of viewport for mobile sheet
const SNAP_HALF = 50;   // default
const SNAP_FULL = 92;   // expanded

let currentSnapPct = SNAP_HALF;

function isMobile() { return window.innerWidth < 768; }

function setDrawerHeight(pct, animated) {
  if (!isMobile()) return;
  drawer.style.transition = animated
    ? 'height 0.32s cubic-bezier(0.32,0.72,0,1)'
    : 'none';
  drawer.style.height = pct + 'vh';
  currentSnapPct = pct;
}

function openDrawer(id) {
  const d = drawerData[id];
  if (!d) return;

  drawerTitle.textContent = d.label;
  drawerTitle.style.color = d.color;
  drawerHandle.style.backgroundColor = d.color;

  drawerTags.innerHTML = '';
  d.tech.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    span.style.cssText = `
      display:inline-block;
      padding:6px 18px;
      border-radius:9999px;
      border:1px solid ${d.color};
      color:${d.color};
      font-size:0.9rem;
      font-weight:600;
      background:rgba(0,0,0,0.2);
    `;
    drawerTags.appendChild(span);
  });

  // reset mobile height
  if (isMobile()) {
    drawer.style.transition = 'none';
    drawer.style.height = SNAP_HALF + 'vh';
    currentSnapPct = SNAP_HALF;
  }

  // show overlay + animate drawer in
  requestAnimationFrame(() => {
    overlay.classList.add('is-open');
    requestAnimationFrame(() => drawer.classList.add('sheet-open'));
  });
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  overlay.classList.remove('is-open');
  drawer.classList.remove('sheet-open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', e => { if (e.target === overlay) closeDrawer(); });
drawerClose.addEventListener('click', closeDrawer);

// ── Drag-to-expand (mobile only) ─────────────────────────────────────────────
let dragStartY = 0;
let dragStartH = 0;
let dragging   = false;

function onDragStart(clientY) {
  if (!isMobile()) return;
  dragging    = true;
  dragStartY  = clientY;
  dragStartH  = drawer.getBoundingClientRect().height;
  drawer.style.transition = 'none';
}

function onDragMove(clientY) {
  if (!dragging || !isMobile()) return;
  const delta  = dragStartY - clientY;           // positive = dragging up
  const newH   = Math.min(
    window.innerHeight * 0.94,
    Math.max(window.innerHeight * 0.25, dragStartH + delta)
  );
  drawer.style.height = newH + 'px';
}

function onDragEnd(clientY) {
  if (!dragging) return;
  dragging = false;
  const delta = dragStartY - clientY;
  const vh    = window.innerHeight;
  const curPx = drawer.getBoundingClientRect().height;
  const curPct= (curPx / vh) * 100;

  // snap logic
  let target;
  if (delta > 40)       target = SNAP_FULL;  // dragged up  → expand
  else if (delta < -40) target = SNAP_HALF;  // dragged down → shrink
  else                  target = currentSnapPct;

  // if shrunk below 30vh → close
  if (curPct < 30 && delta < 0) { closeDrawer(); return; }

  setDrawerHeight(target, true);
}

// Touch
drawerHandle.addEventListener('touchstart', e => onDragStart(e.touches[0].clientY), { passive: true });
drawerHandle.addEventListener('touchmove',  e => { e.preventDefault(); onDragMove(e.touches[0].clientY); }, { passive: false });
drawerHandle.addEventListener('touchend',   e => onDragEnd(e.changedTouches[0].clientY));

// Mouse (for devtools mobile sim)
drawerHandle.addEventListener('mousedown',  e => { onDragStart(e.clientY); e.preventDefault(); });
window.addEventListener('mousemove',        e => { if (dragging) onDragMove(e.clientY); });
window.addEventListener('mouseup',          e => { if (dragging) onDragEnd(e.clientY); });