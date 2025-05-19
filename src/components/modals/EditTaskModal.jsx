/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useQueryClient,useMutation} from '@tanstack/react-query'

import Style from "../../scss/components/modals/manageTaskModal.module.scss";
import { editTask } from "../../api/editTask";

import { findTaskById } from "../../utils/storageUtils";

export default function EditTaskModal({ isOpenModal, onClose, editTaskId }) {
  const queryClient = useQueryClient()
  const {register,handleSubmit, formState:{errors, },reset} = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    

    if(editTaskId){
      const initialData = findTaskById(editTaskId)
      
      reset({
      title: initialData.title,
      description: initialData.description,
      priority: initialData.priority,
    })}

  },[isOpenModal, editTaskId])

  const {mutate: editTaskMutation} = useMutation({
    mutationKey: ['editTaskMutation'],
    mutationFn: editTask,
    onSuccess:() => {
      queryClient.invalidateQueries(['renderTasks'])
    }
  })


  function onSubmit(data) {
      editTaskMutation({data, editTaskId})
      onClose()
      reset()
    }
    

  if (!isOpenModal) return null;

  return createPortal(
    <>
      <div className={Style.modal} id="modal">
        <div className={Style.wrapper}>
          <div className={Style.content}>
            <h1 className={Style.modalTitle}>Edit Todo</h1>
            <form className={Style.taskManagementForm} id="form" onSubmit={handleSubmit(onSubmit)}>
              <fieldset itemID="form">
                <legend>Todo Title</legend>
                <input
                  className={Style.titleInput}
                  type="text"
                  placeholder="Please edit a title for task"
                  {...register('title',{required: 'This field is required'})}
                />
              </fieldset>
              {errors.title?.message && <p className={Style.error}>{errors.title.message}</p>}

              <fieldset itemID="form">
                <legend>Description</legend>
                <textarea
                  className={Style.taskDescription}
                  placeholder="Please edit description to task"
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
                <button className={Style.createTaskButton}>
                  Edit
                </button>
                <button className={Style.cancelTaskButton} 
                  onClick={()=>{
                    onClose()
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
