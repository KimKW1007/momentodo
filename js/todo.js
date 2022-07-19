//todayTodo,tomorrowTodo,todayUl,tomorrowUl
// 위 변수들은 login.js 에 있음!! 주의

/* 
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        할일 체크하면 한일로 넘기셈
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/

const todoForm = todoBox.querySelector('.todo-form');
const todoInput = todoForm.querySelector('.todo');

// Clear Btn
const allClearBtn = todoBox.querySelector('.all-clear');
const toDayClearBtn = todoBox.querySelector('.today-clear');
const wdClearBtn = todoBox.querySelector('.work-done-clear');

// Keys
const TODO_KEY = 'todoList';
const WD_KEY = 'workdoneList';

// 매개변수에 따라 오늘 또는 내일 로컬에 저장
const saveTodo = (key, tos) => {
  localStorage.setItem(key, JSON.stringify(tos));
};

const deleteFn = (e) => {
  const li = e.target.parentElement;
  if (confirm('Really?')) {
    removeItem(li);
  }
};

const removeItem = (li) => {
  if (li.parentElement.parentElement.classList.contains('today-todo')) {
    workdones.push(todos.filter((todo) => todo.id === parseInt(li.id))[0]);
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodo(TODO_KEY, todos);
    saveTodo(WD_KEY, workdones);
  } else {
    todos.push(workdones.filter((todo) => todo.id === parseInt(li.id))[0]);
    workdones = workdones.filter((tomo) => tomo.id !== parseInt(li.id));
    saveTodo(TODO_KEY, todos);
    saveTodo(WD_KEY, workdones);
  }
  li.remove();
};

// 오늘 리스트 함수 submit과 연결됨
const addTodoList = (todo) => {
  const li = document.createElement('li');
  li.id = todo.id;
  const div = document.createElement("div");
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = todo.check;
  const label = document.createElement("label");
  label.htmlFor = checkBox.id
  checkBox.addEventListener('click', (e) => {
    const li = e.target.parentElement.parentElement;
    removeItem(li);
    addWorkdoneList(todo);
  });
  const span = document.createElement('span');
  span.innerText = todo.text;
  span.title = todo.text;
  const del = document.createElement('button');
  del.classList.add("ti-trash");
  del.title = '삭제';
  del.addEventListener('click', deleteFn);
  const i = document.createElement("i");
  i.addEventListener("mouseenter",()=>{
    div.classList.add("on")
  })
  li.addEventListener("mouseleave",()=>{
    div.classList.remove("on")
  })
  div.appendChild(label);
  div.appendChild(checkBox);
  div.appendChild(span);
  div.appendChild(i);
  li.appendChild(div);
  li.appendChild(del);
  todayUl.appendChild(li);
};

// 내일 리스트 함수 submit과 연결됨
const addWorkdoneList = (todo) => {
  const li = document.createElement('li');
  li.id = todo.id;  
  const div = document.createElement("div");
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = true;
  checkBox.id = todo.check;
  const label = document.createElement("label");
  label.htmlFor = checkBox.id
  checkBox.addEventListener('click', (e) => {
    const li = e.target.parentElement.parentElement;
    removeItem(li);
    addTodoList(todo);
  });
  const span = document.createElement('span');
  span.innerText = todo.text;
  span.title = todo.text;
  span.classList.add("line")
  const del = document.createElement('button');
  del.classList.add("ti-trash");
  del.title = '삭제';
  del.addEventListener('click', deleteFn);
  const i = document.createElement("i");
  i.addEventListener("mouseenter",()=>{
    div.classList.add("on")
  })
  li.addEventListener("mouseleave",()=>{
    div.classList.remove("on")
  })
  div.appendChild(label);
  div.appendChild(checkBox);
  div.appendChild(span);
  div.appendChild(i);
  li.appendChild(div);
  li.appendChild(del);
  wdUl.appendChild(li);
};

// 오늘 submit 함수
const listFormHandler = (e) => {
  e.preventDefault();
  const todo = todoInput.value;
  todoInput.value = '';
  const newTodo = {
    text: todo,
    id: Date.now(),
    check: Date.now()+1,
  };
  todos.push(newTodo);
  addTodoList(newTodo);
  saveTodo(TODO_KEY, todos);
};


// 오늘 내일 할일 각자 submit
todoForm.addEventListener('submit', listFormHandler);

// 만약 localStorage 값이 잇다면 그걸 쓰고 없다면 초기상태
const savedParse = localStorage.getItem(TODO_KEY);
const savedParse2 = localStorage.getItem(WD_KEY);

if (savedParse !== null) {
  const parseTodo = JSON.parse(savedParse);
  todos = parseTodo;
  parseTodo.forEach(addTodoList);
}
if (savedParse2 !== null) {
  const parseWd = JSON.parse(savedParse2);
  workdones = parseWd;
  parseWd.forEach(addWorkdoneList);
}

// 통합 전체 삭제
const allClear = (e) => {
  e.preventDefault();
  if (confirm('오늘과 내일의 할 일을 모두 삭제합니다.')) {
    todos = [];
    todayUl.innerHTML = '';
    localStorage.removeItem(TODO_KEY);
    workdones = [];
    wdUl.innerHTML = '';
    localStorage.removeItem(WD_KEY);
    alert('모두 삭제되었습니다.');
  }
};
// 오늘 전체 삭제
const toDayClear = (e) => {
  e.preventDefault();
  if (confirm('오늘 할 일을 전체 삭제합니다.')) {
    todos = [];
    todayUl.innerHTML = '';
    localStorage.removeItem(TODO_KEY);
    alert('모두 삭제되었습니다.');
  }
};
// 내일 전체 삭제
const wdClear = (e) => {
  e.preventDefault();
  if (confirm('완료한 일을 전체 삭제합니다.')) {
    workdones = [];
    wdUl.innerHTML = '';
    localStorage.removeItem(WD_KEY);
    alert('모두 삭제되었습니다.');
  }
};

allClearBtn.addEventListener('click', allClear);
toDayClearBtn.addEventListener('click', toDayClear);
wdClearBtn.addEventListener('click', wdClear);
