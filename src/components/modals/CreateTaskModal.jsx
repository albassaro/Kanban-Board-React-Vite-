import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import {useQueryClient,useMutation} from '@tanstack/react-query'

import Style from "../../scss/components/modals/manageTaskModal.module.scss";

import { createTask } from "../../api/createTask";


export default function CreateTaskModal({ isOpenModal, onClose, whichColumn }) {
  const queryClient = useQueryClient()
  const {register,handleSubmit, formState:{errors, },reset} = useForm({
    mode: 'onChange'
  })

  const {mutate: createTaskMutation} = useMutation({
    mutationKey: ['createTaskMutation'],
    mutationFn: createTask,
    
    onSuccess:() => {
      queryClient.invalidateQueries(['renderTasks'])
    }
  })

   const onCreateTodo = (data) => {
    createTaskMutation({data,whichColumn})
    onClose()
    reset()   
  }

  if (!isOpenModal) return null;

  return createPortal(
    <>
      <div className={Style.modal} id="modal">
        <div className={Style.wrapper}>
          <div className={Style.content}>
            <h1 className={Style.modalTitle}>Create New Task</h1>
            <form className={Style.taskManagementForm} id="form" onSubmit={handleSubmit(onCreateTodo)}>
              <fieldset itemID="form">
                <legend>Task Title</legend>
                <input
                  className={Style.titleInput}
                  type="text"
                  placeholder="Please enter a title for the new task"
                  {...register('title',{required: 'This field is required'})}
                />
              </fieldset>
              {errors.title?.message && <p className={Style.error}>{errors.title.message}</p>}

              <fieldset itemID="form">
                <legend>Description</legend>
                <textarea
                  className={Style.taskDescription}
                  placeholder="Please add a description to the new task"
                  rows={10}
                  {...register('description',{required: 'This field is required'})}
                ></textarea>
              </fieldset>
              {errors.description?.message && <p className={Style.error}>{errors.description.message}</p>}

              
              <div className={Style.taskPriority}>
                <label className={Style.taskPriorityTitle}>Priority</label>
                <div className={Style.taskPriorityItem}>
                  <input
                    type="radio"
                    id="highPriority"
                    value="high"
                    {...register('priority',{required: 'This field is required'})}
                  />
                  <label className={Style.highPriority} htmlFor="highPriority">
                    high
                  </label>
                </div>

                <div className={Style.taskPriorityItem}>
                  <input
                    type="radio"
                    id="mediumPriority"
                    value="medium"
                    {...register('priority',{required: 'This field is required'})}
                  />
                  <label
                    className={Style.mediumPriority}
                    htmlFor="mediumPriority"
                  >
                    medium
                  </label>
                  
                </div>
                <div className={Style.taskPriorityItem}>
                  <input
                    type="radio"
                    id="lowPriority"
                    value="low"
                    {...register('priority',{required: 'This field is required'})}
                  />
                  <label className={Style.lowPriority} htmlFor="lowPriority">
                    low
                  </label>     
                </div>   
              </div>
              {errors.priority?.message && <p className={Style.error}>{errors.priority.message}</p>}




              {/* <label htmlFor="taskEndingDate">Ending Date</label>
              <input type="date" name="taskEndingDate" id="" /> */}

              <div className={Style.modalButtons}>
                <button type="submit" className={Style.createTaskButton}>
                  Create
                </button>
                <button 
                  className={Style.cancelTaskButton} 
                  onClick={()=>{ 
                    onClose(), 
                    reset()
                  }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
