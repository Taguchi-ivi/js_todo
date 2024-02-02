// Elementの取得、生成

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

const countElements = () => {
  const taskCount = document.getElementById('task-count');
  const taskNotStartCount = document.getElementById('task-not-start-count');
  const taskCompCount = document.getElementById('task-comp-count');
  return [taskCount, taskNotStartCount, taskCompCount]
}

export { getLiElement, countElements }