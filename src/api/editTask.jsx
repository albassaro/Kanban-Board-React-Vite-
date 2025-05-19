import { addToStorage, getFromStorage } from "../utils/storageUtils"

export const editTask = ({data, editTaskId}) => {

  const tasksFromStorage = getFromStorage('tasks')
  
  const rewritableTask = tasksFromStorage.find((task) => task.id === editTaskId)

  const modifiedTask = Object.assign(rewritableTask, data)

  tasksFromStorage.splice(tasksFromStorage.indexOf(rewritableTask), 1 , modifiedTask)
  
  addToStorage('tasks',tasksFromStorage)
}