import { useState } from "react";

import Style from "../../scss/components/content/kanbanTasks.module.scss";

import editTaskImg from "/favicons/edit-icon.svg";

import EditTaskModal from "../modals/EditTaskModal.jsx";

export default function KanbanTasks({ tasksList }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editTodo, setEditTodo] = useState();

  return (
    <>
      {tasksList.map((task) => (
        <>
          {/* <div className={Style.dropZone}>drop task here</div> */}

          <div className={Style.taskItem} data-id={task.id} key={task.id}>
            <div className={Style.taskControl}>
              <p className={Style.taskPriority} data-priority={task.priority}>
                {task.priority}
              </p>
              <button
                className={Style.editTaskButton}
                onClick={(e) => {
                  setIsOpenModal(true)
                  setEditTodo(e.target.closest('[data-id]').getAttribute('data-id'))
                }}
              >
                <img
                  className={Style.editTask}
                  src={editTaskImg}
                  alt="edit task"
                />
              </button>
            </div>

            <h3 className={Style.taskTitle}>{task.title}</h3>
            <p className={Style.taskText}>{task.description}</p>
            <div className={Style.taskFooter}>{task.dateTime}</div>
          </div>
        </>
      ))}

      <EditTaskModal isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} editTaskId = {editTodo} />
      {/* <div className={Style.dropZone}>drop task here</div> */}
    </>
  );
}
