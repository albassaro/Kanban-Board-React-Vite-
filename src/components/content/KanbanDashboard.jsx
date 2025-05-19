import { useState } from "react";
import { useMutationState, useQuery } from "@tanstack/react-query";

import Style from "../../scss/components/content/kanbanDashboard.module.scss";
import createToDoTaskImg from "/favicons/add-square-icon--blue.svg";
import createInProgressTaskImg from "/favicons/add-square-icon--black.svg";

import { fetchTasks } from "../../api/renderTasks.jsx";
import FilterTasks from "./FilterTasks.jsx";
import KanbanTasks from "./KanbanTasks.jsx";
import CreateTaskModal from "../modals/CreateTaskModal.jsx";



export default function KanbanDashboard() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [whichColumn, setWhichColumn] = useState();
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");


  const { data,isFetching, isLoading} = useQuery({
    queryKey: ["renderTasks", { priority, search }],
    queryFn: () => fetchTasks({ priority, search }),
  });

  function filter(array, colunmName) {
    if (array) {
      const tasks = array.filter((column) => column.columnType === colunmName);

      return tasks;
    } else return [];
  }

  return (
    <>
      <section className={Style.container}>
        <div className={Style.headerPage}>
          <h1 className={Style.title}>Kanban Dashboard</h1>
          <FilterTasks
            onChangeFilters={(filters) => {
              setPriority(filters.priority);
              setSearch(filters.search);
            }}
          />
        </div>

          {isFetching && !isLoading
            ? <p>Updating...</p> 
            : null }
         
          <div className={Style.wrapper}>
            <div className={Style.taskColumn} data-column-type="Todo">
              <div className={Style.taskManagement}>
                <h2 className={Style.taskType}>
                  Todo
                  <span className={Style.tasksCount}>
                    {filter(data, "Todo")?.length}
                  </span>
                </h2>
                <button
                  className={Style.createTaskButton}
                  onClick={(e) => {
                    setIsOpenModal(true);
                    setWhichColumn(
                      e.target
                        .closest("[data-column-type]")
                        .getAttribute("data-column-type")
                    );
                  }}
                >
                  <img
                    className={Style.createTask}
                    src={createToDoTaskImg}
                    alt="create new task"
                  />
                </button>
              </div>
              {isLoading 
                ? <p>Loading...</p> 
                : <KanbanTasks tasksList={filter(data, "Todo")}
              />}
            </div>

            <div className={Style.taskColumn} data-column-type="In Progress">
              <div className={Style.taskManagement}>
                <h2 className={Style.taskType}>
                  In Progress
                  <span className={Style.tasksCount}>
                    {filter(data, "In Progress").length}
                  </span>
                </h2>
                <button
                  className={Style.createTaskButton}
                  onClick={(e) => {
                    setIsOpenModal(true);
                    setWhichColumn(
                      e.target
                        .closest("[data-column-type]")
                        .getAttribute("data-column-type")
                    );
                  }}
                >
                  <img
                    className={Style.createTask}
                    src={createInProgressTaskImg}
                    alt="create new task"
                  />
                </button>
              </div>
              {isLoading 
                ? <p>Loading...</p> 
                : <KanbanTasks tasksList={filter(data, "In Progress")}
              />}
              
            </div>

            <div className={Style.taskColumn} data-column-type="Done">
              <div className={Style.taskManagement}>
                <h2 className={Style.taskType}>
                  Done
                  <span className={Style.tasksCount}>
                    {filter(data, "Done").length}
                  </span>
                </h2>
              </div>
              {isLoading 
                ? <p>Loading...</p> 
                : <KanbanTasks tasksList={filter(data, "Done")}
              />}
              
            </div>

            <CreateTaskModal
              whichColumn={whichColumn}
              isOpenModal={isOpenModal}
              onClose={() => setIsOpenModal(false)}
            />
          </div>
        
      </section>
    </>
  );
}
