import { getFromStorage } from "../utils/storageUtils";

// задаем масив значений для разных фильтров с последующей масштабируемостью
const taskFilters = {
  priority: ['completed', 'high' , 'medium' , 'low']
}


export const fetchTasks = async({priority = '', search = ''}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))


  let filteredTasks = getFromStorage('tasks') 

  if(taskFilters.priority.find((status)=>status === priority)){
    filteredTasks = filteredTasks.filter((task)=>{
      return task.priority === priority
    })
  }
  if(search.length > 0){
    filteredTasks = filteredTasks.filter((task) => {
      return task.title.toLowerCase().includes(search.toLowerCase()) 
  })}
    
  
  return filteredTasks
}

