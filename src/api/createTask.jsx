import { v4 as uuidv4 } from 'uuid';
import { getFromStorage, addToStorage } from '../utils/storageUtils';


export const createTask = ({data, whichColumn}) => {

  const newTask = {
    columnType: whichColumn,
    id: uuidv4(),
    priority: data.priority,
    title: data.title,
    description: data.description,
    dateTime: new Date().toISOString(),
  }

  const storageTodos = getFromStorage('tasks')

  if(storageTodos){
    storageTodos.unshift(newTask)
    addToStorage('tasks', storageTodos)
  }else addToStorage('tasks', [newTask])

}