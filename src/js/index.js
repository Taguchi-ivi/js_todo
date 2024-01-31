/*
  NOTE: Most
    camelCase
    single quotes
*/

const submit = document.getElementById('submit');
const taskCount = document.getElementById('task-count');
const taskNotStartCount = document.getElementById('task-not-start-count');
const taskCompCount = document.getElementById('task-comp-count');
// const taskCheckBox = document.getElementById('checkbox');
const allTaskCheckBox = document.querySelectorAll('input[name="task-checkbox"]')
let taskContent = document.getElementById('card-item-content')
let counter = {
  all: 0,
  notStart: 0,
  comp: 0,
}

const addTask = (event) => {
  event.preventDefault();
  const inputValue = document.getElementById('input-todo');
  const task = inputValue.value;
  if (task) {
    todoList.push(task);

    // count fix
    counter.all += 1;
    counter.notStart += 1;
    taskCount.textContent = counter.all;
    taskNotStartCount.textContent = counter.notStart;

    // task view fix
    let newTaskContent = document.createElement('li');
    newTaskContent.setAttribute('class', 'card-item-wrapper');
    newTaskContent.setAttribute('id', `card-item-index-${todoList.length - 1}`);
    newTaskContent.innerHTML = `
    <input id="checkbox" type="checkbox" class="card-item-checkbox" name="task-checkbox">
    <p class="card-item-p">${task}</p>
    <div class="card-item-btns">
      <button class="edit">編集</button><button class="del">削除</button>
    </div>
    `;
    taskContent.appendChild(newTaskContent);

    // task input clear
    inputValue.value = '';
  }
}

// allTaskCheckBox.forEach((checkBox) => {
//   checkBox.addEventListener('change', (event) => {
//     if (event.target.checked) {
//       counter.notStart -= 1;
//       counter.comp += 1;
//       taskNotStartCount.textContent = counter.notStart;
//       taskCompCount.textContent = counter.comp;
//     } else {
//       counter.notStart += 1;
//       counter.comp -= 1;
//       taskNotStartCount.textContent = counter.notStart;
//       taskCompCount.textContent = counter.comp;
//     }
//   })
// })

// const changeCheckBox = (event) => {
//   event.preventDefault();
//   console.log('check');

// }


let todoList = [];
submit.addEventListener('click', addTask);

// taskCheckBox.addEventListener('change', changeCheckBox);

