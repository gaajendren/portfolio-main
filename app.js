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



