/*
  NOTE: Most
    camelCase
    single quotes
*/

const taskCount = document.getElementById('task-count');
const taskNotStartCount = document.getElementById('task-not-start-count');
const taskCompCount = document.getElementById('task-comp-count');
let taskContent = document.getElementById('card-item-content')
let todoList = [];  // status: 0: 未着手, 1: 完了

const getCountByStatus = (status) => {
  const newArray = todoList.filter((todo) => {
    return todo.status === status;
  })
  return newArray.length;
}

const updateStatusById = (id, status) => {
  return todoList.map((todo) => {
    if (todo.id === id) {
      todo.status = status;
    }
    return todo;
  })
}

const filterById = (id) => {
  return todoList.filter((todo) => {
    return todo.id !== id;
  })
}

const addTask = () => {
  const inputValue = document.getElementById('input-todo');
  const task = inputValue.value;
  if (task) {
    const newTask = {
      id: todoList.length,
      content: task,
      status: 0,
    }
    todoList.push(newTask);

    // count fix
    taskCount.textContent = todoList.length;
    taskNotStartCount.textContent = getCountByStatus(0);

    // task view fix
    let newTaskContent = document.createElement('li');
    newTaskContent.setAttribute('class', 'card-item-wrapper');
    newTaskContent.setAttribute('id', `${newTask.id}`);
    newTaskContent.innerHTML = `
    <input id="checkbox" type="checkbox" class="card-item-checkbox" name="task-checkbox">
    <p class="card-item-p">${task}</p>
    <div class="card-item-btns">
      <button class="edit" id="edit">編集</button><button class="del" id="del">削除</button>
    </div>
    `;
    taskContent.appendChild(newTaskContent);

    // task input clear
    inputValue.value = '';
  }
}

// チェックボックスがクリックされた場合の処理
const changeCheckBox = (target) => {
  const parentElement = target.parentElement;
  const id = Number(parentElement.id);
  const childElement = parentElement.children[1];
  let disabled;
  let status;
  if (target.checked) {
    childElement.classList.add('cancellation');
    disabled = true;
    status = 1;
  } else {
    childElement.classList.remove('cancellation');
    disabled = false;
    status = 0;
  }

  todoList = updateStatusById(id, status);
  taskNotStartCount.textContent = getCountByStatus(0);
  taskCompCount.textContent = getCountByStatus(1);

  const childEditBtn = parentElement.children[2].children[0];
  childEditBtn.disabled = disabled;
}

const editTask = (target) => {
  console.log("edit")
  console.log(target)
}

const deleteTask = (target) => {
  const parentElement = target.parentElement.parentElement;
  const id = Number(parentElement.id);
  parentElement.remove();

  todoList = filterById(id);
  taskCount.textContent = todoList.length;
  taskNotStartCount.textContent = getCountByStatus(0);
  taskCompCount.textContent = getCountByStatus(1);
}

document.addEventListener('click', (event) => {
  // checkboxのイベントさえも無効化してしまう、どうしようかな
  // event.preventDefault();
  const target = event.target;

  if (target.matches('.card-item-checkbox')) {
    changeCheckBox(target)
  }

  if (target.matches('#submit')) {
    addTask()
  }

  if (target.matches('#edit')) {
    editTask(target)
  }
  if (target.matches('#del')) {
    deleteTask(target)
  }
})

