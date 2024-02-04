
import { getAllCount, getCountByStatus, updateStatusById } from './count.js';
import { getLiElement, countElements } from './element.js';
import { getRandomId } from './random.js';


/*
  taskの追加処理
*/
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


/*
  チェックボックスの変更処理
*/
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


/*
  task変更後の保存処理
*/
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


/*
  task編集表示処理
*/
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

/*
  taskの削除処理
*/
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

export { changeCheckBox, addTask, keepTask, editTaskView, deleteTask }