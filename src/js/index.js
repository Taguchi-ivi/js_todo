/*
  NOTE: Most
    camelCase
    single quotes
*/

// indexをidにするのはNG 削除後の追加などで重複する可能性があるため
const getRandomId = () => {
  return Math.floor( Math.random() * 10000 ) ;
}
const getLiElement = (task) => {
  return `
    <input id="checkbox" type="checkbox" class="card-item-checkbox active" name="task-checkbox">
    <p class="card-item-p">${task}</p>
    <div class="card-item-btns">
      <button class="keep" id="keep">保存</button><button class="edit active" id="edit">編集</button><button class="del" id="del">削除</button>
    </div>
    <input type="number" class="card-item-checkbox" name="0">
    `
}
const getTaskArray = () => {
  return Array.from(document.querySelectorAll('.card-item-wrapper'))
}
const getAllCount = () => {
  return getTaskArray().length;
}

const getCountByStatus = (status) => {
  const taskList = getTaskArray();

  const newArray = taskList.filter((task) => {
    const statusInput = task.children[3];
    const getStatus = Number(statusInput.name);
    return getStatus === status;
  })
  return newArray.length;
}

const updateStatusById = (id, status) => {
  const taskList = getTaskArray();

  taskList.map((task) => {
    const taskId = Number(task.id);
    if (taskId === id) {
      const statusInput = task.children[3];
      statusInput.name = String(status);
    }
  })
}

const countElements = () => {
  const taskCount = document.getElementById('task-count');
  const taskNotStartCount = document.getElementById('task-not-start-count');
  const taskCompCount = document.getElementById('task-comp-count');
  return [taskCount, taskNotStartCount, taskCompCount]
}

const addTask = () => {
  const inputValue = document.getElementById('input-todo');
  const task = inputValue.value;
  if (task) {

    // count fix
    const [taskCount, taskNotStartCount, _] = countElements();
    const count = getAllCount();
    taskCount.textContent = count + 1;
    taskNotStartCount.textContent = getCountByStatus(0) + 1;

    // task view fix
    const newTaskContent = document.createElement('li');
    newTaskContent.setAttribute('class', 'card-item-wrapper');
    newTaskContent.setAttribute('id', String(getRandomId()));
    newTaskContent.innerHTML = getLiElement(task);
    document.getElementById('card-item-content').appendChild(newTaskContent);

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

  updateStatusById(id, status);
  const [_, taskNotStartCount, taskCompCount] = countElements();
  taskNotStartCount.textContent = getCountByStatus(0);
  taskCompCount.textContent = getCountByStatus(1);

  const childEditBtn = parentElement.children[2].children[1];
  childEditBtn.disabled = disabled;
}

const keepTask = (target) => {
  const parentElement = target.parentElement.parentElement;
  const id = Number(parentElement.id);
  const childElementCheckbox = parentElement.children[0];
  const childElementInputText = parentElement.children[1];
  if (childElementInputText.value === '') {
    alert('タスクを入力してください');
    childElementInputText.focus();
    return;
  }

  const editBtn = target.parentElement.children[1];
  target.classList.remove('active');
  editBtn.classList.add('active');


  childElementCheckbox.classList.add('active');

  const viewPTag = document.createElement('p');
  viewPTag.setAttribute('class', 'card-item-p');
  viewPTag.textContent = childElementInputText.value;

  childElementInputText.replaceWith(viewPTag);
}

const editTaskView = (target) => {

  const keepBtn = target.parentElement.children[0];
  target.classList.remove('active');
  keepBtn.classList.add('active');

  const parentElement = target.parentElement.parentElement;
  const childElementCheckbox = parentElement.children[0];
  const childElementPTag = parentElement.children[1];
  const task = childElementPTag.textContent;

  childElementCheckbox.classList.remove('active');

  const editInput = document.createElement('input');
  editInput.setAttribute('type', 'text');
  editInput.setAttribute('value', task);
  editInput.setAttribute('id', 'new-edit-input');
  editInput.setAttribute('class', 'new-edit-input');
  editInput.focus();

  childElementPTag.replaceWith(editInput);

}

const deleteTask = (target) => {
  const parentElement = target.parentElement.parentElement;

  const checkFlg = window.confirm('削除してもよろしいですか？');
  if (!checkFlg) {
    return;
  }
  parentElement.remove();

  const [taskCount, taskNotStartCount, taskCompCount] = countElements();
  taskCount.textContent = getAllCount();
  taskNotStartCount.textContent = getCountByStatus(0);
  taskCompCount.textContent = getCountByStatus(1);
}

document.addEventListener('click', (event) => {
  // event.preventDefault();
  const target = event.target;

  if (target.matches('.card-item-checkbox')) {
    changeCheckBox(target)
  }

  if (target.matches('#submit')) {
    addTask()
  }

  if (target.matches('#keep')) {
    keepTask(target)
  }
  if (target.matches('#edit')) {
    editTaskView(target)
  }
  if (target.matches('#del')) {
    deleteTask(target)
  }
})

