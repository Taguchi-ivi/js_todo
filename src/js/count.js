// counter周りの処理をまとめたファイル

// 対象のListを配列で取得する
const getTaskArray = () => {
  return Array.from(document.querySelectorAll('.card-item-wrapper'))
}

// タスクの合計数を取得
const getAllCount = () => {
  return getTaskArray().length;
}

// タスクのステータスごとの合計数を取得
const getCountByStatus = (status) => {
  const taskList = getTaskArray();

  const newArray = taskList.filter((task) => {
    const statusInput = task.children[3];
    const getStatus = Number(statusInput.name);
    return getStatus === status;
  })
  return newArray.length;
}

// タスクのステータスを更新
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


export { getAllCount, getCountByStatus, updateStatusById }