
export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) 
}


export const addToStorage = (key,value) => {
  localStorage.setItem(key,JSON.stringify(value))
}


export const findTaskById = (taskId)=>{
  
  const tasksArray = getFromStorage('tasks')

  const foundTask = tasksArray.find((task) => task.id === taskId)

  return foundTask
}


