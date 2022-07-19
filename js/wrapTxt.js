const welcomeBox = document.querySelectorAll(".login-box h2 p");
const word = "Welcome!Write you'r To-Do List!!";
let idx = 0;



welcomeBox.forEach((p,index)=>{
  let typingTimer = setInterval(()=>{
    if(p.classList.contains('active')){
      p.textContent += word[idx++]
      if(idx > 7){
        welcomeBox[0].classList.remove("active")
        welcomeBox[1].classList.add("active")
      }
      if(idx > word.length-1){
        clearInterval(typingTimer)
      }
    }
  }, 200)
})