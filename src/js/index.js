import { changeCheckBox, addTask, keepTask, editTaskView, deleteTask } from './functions.js'
/*
  NOTE: Most
    camelCase
    single quotes
*/

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

