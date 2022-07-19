  const clock = document.querySelector(".clock");
  const toDay = document.querySelector(".toDay");
  const kday = ["일","월","화","수","목","금","토"];



  const getClock =()=>{
    const nd = new Date();
    let year = String(nd.getFullYear()).padStart(2,"0");
    let month = String(nd.getMonth()+1).padStart(2,"0");
    let date = String(nd.getDate()).padStart(2,"0");    
    let hour = String(nd.getHours()).padStart(2,"0");   
    let minu = String(nd.getMinutes()).padStart(2,"0");
    let sec = String(nd.getSeconds()).padStart(2,"0");
    // element.padStart()는 element가 String이여야 합니다!
    // padStart(2, "0")을 풀어서 쓰자면 element가 2자리 이하이면
    // 앞에 0을 붙여줘~ 라는 뜻입니다. 
    // padEnd()도 있는데 이것은 반대겠지요? ㅎㅎ 


    
    let day = nd.getDay();  /* getDay 는  0~6까지 나타냅니다 
                              저는 요일을 지정하고 싶어서
                              배열을 따로 만들어 그에 맞는 요일을
                              배정하였습니다. */
    let koDay = null;

    kday.forEach((obj,idx)=>{
      if(idx === day){
        koDay = obj
      }
    })


    clock.innerHTML = `<div class="hour" >${hour}</div><i>:</i><div class="minu" >${minu}</div><i>:</i><div class="sec" >${sec}</div>`
    toDay.innerHTML = `<div class="year">${year}</div><div class="date-wrap" ><div class="left"><div class="month">${month}</div><div class="day">${koDay}</div></div><div class="date">${date}</div></div>` 

    const dayC = document.querySelector('.day');
    const dateC = document.querySelector('.date');

    if(koDay === "토"){
      dayC.style.color = "#2979ff"
      dateC.style.color = "#2979ff"
    }else if(koDay === "일"){
      dayC.style.color = "#e53935"
      dateC.style.color = "#e53935"
    }else{
      dayC.style.color = "#000"
      dateC.style.color = "#000"
    }
  }

  /* setInterval을 1초로 맞춰둬서 1초가 지나야 실행되는데 */
  /* 그전에 비어있으면 곤란하니 미리 넣어 준 겁니다. */
  getClock()

  /* setInterval과 setTimeout을 쓸때 1000이 1초라는거 알고 계시죠? */
  /* 1초마다 getClock함수를 실행해서 new Date()를 갱신 시켜주는겁니다. */
  setInterval(getClock, 1000);
