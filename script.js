const scenes=[...document.querySelectorAll(".scene")];
let current=0;
const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");
const musicText=document.getElementById("musicText");

function go(n){
  current=Math.max(0,Math.min(n,scenes.length-1));
  scenes.forEach((s,i)=>s.classList.toggle("active",i===current));
  window.scrollTo(0,0);
  // Try to start the supplied music after the first user interaction.
  if(current>0 && music.paused){
    music.play().then(()=>{
      musicBtn.textContent="Ⅱ";
      musicText.textContent="Music playing";
    }).catch(()=>{});
  }
}
musicBtn.addEventListener("click",()=>{
  if(music.paused){
    music.play().then(()=>{musicBtn.textContent="Ⅱ";musicText.textContent="Music playing"});
  }else{
    music.pause(); musicBtn.textContent="▶"; musicText.textContent="Music paused";
  }
});

// Optional photo loader: place photo01.jpg, photo02.jpg, photo03.jpg, photo04.jpg
// in the same folder as index.html.
const photos=["photo01.jpg","photo02.jpg","photo03.jpg","photo04.jpg"];
["photo1","photo2","photo3","photo4"].forEach((id,i)=>{
  const el=document.getElementById(id);
  const img=new Image();
  img.onload=()=>{
    el.classList.remove("placeholder");
    el.innerHTML="";
    el.appendChild(img);
  };
  img.src=photos[i];
});

// If the MP3 is missing, the browser simply leaves the music control available.
music.addEventListener("error",()=>{musicText.textContent="Add music.mp3";musicBtn.disabled=true;});

// Keyboard support for desktop preview.
document.addEventListener("keydown",(e)=>{
  if(e.key==="ArrowRight" && current<scenes.length-1) go(current+1);
  if(e.key==="ArrowLeft" && current>0) go(current-1);
});
