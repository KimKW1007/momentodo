const loginBox = document.querySelector(".login-box");
const loginForm = loginBox.querySelector('.login-form');
const loginInput = loginForm.querySelector('input');
const loginBtn = loginForm.querySelector('button');
const user = document.querySelector('.user');
const userP = user.querySelector('p');
const reSet = user.querySelector('.re-set');
const todoBox = document.querySelector('.todo-box');
const todayTodo = todoBox.querySelector(".today-todo");
const workDoneBox = todoBox.querySelector(".work-done-box");
const todayUl = todayTodo.querySelector('ul');
const wdUl = workDoneBox.querySelector('ul');

let todos = [];
let workdones = [];

const USER_ID = "userID"

const setUserName = (userID)=>{
  // 1-2. 매개변수 userID를 받아 넣어줍니다.
  userP.innerText = `✨ Hi, ${userID} ✨`;
  loginBox.classList.add("out")
  todoBox.classList.remove("hidden");
  setTimeout(() => {
    todoBox.classList.add("opa")
    loginBox.classList.add("hidden")
  }, 800);
}


// 1. form에서 submit 실행할때 쓰는 함수! */
const formHandler =(e)=>{
  e.preventDefault();
  // 1-1. userId에 input.value를 넣습니다.
  const userId = loginInput.value;
  // localStorage에 key값과 value값을 넣어줍니다.
  localStorage.setItem(USER_ID,userId)
  setUserName(userId)
  
}




  // 2. localStorage안에 값을 가져옵니다. 
const savedId = localStorage.getItem(USER_ID);
// 2-1. 만약 없다면 초기 화면과 같은상태로 만듭니다. 
if(savedId === null){
  loginBox.classList.remove("hidden")
  todoBox.classList.add("hidden");
  // 2-2. 1번의  EventListener는 여기 있습니다.
  // 이유는 localStorage안에 값이 있다면 필요없기때문입니다.
  loginForm.addEventListener("submit",formHandler)
}else{
  loginBox.classList.add("hidden")
  todoBox.classList.remove("hidden");
  setUserName(savedId)
}

// 혹시나 이름을 잘못 설정했거나 변경하고 싶은 사람을 위해
// 만든 이름변경하는 함수입니다.
const logoutFn = (e)=>{
  e.preventDefault();
  if(confirm("이름을 바꿈과 동시에 리스트가 초기화 됩니다.\n로그아웃 하시겠습니까?")){
    loginInput.value = '';
    localStorage.removeItem(USER_ID);
    todoBox.classList.remove("opa");
    setTimeout(() => {
      todoBox.classList.add("hidden")
      loginBox.classList.remove("out")
    }, 400);
    loginBox.classList.remove("hidden")
    localStorage.removeItem("todoList");
    localStorage.removeItem("workdoneList");
    todos = [];
    workdones = [];
    todayUl.innerHTML = '';
    wdUl.innerHTML = '';
  }
}


reSet.addEventListener('click',logoutFn)
