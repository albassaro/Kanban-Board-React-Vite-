/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect, useState } from "react";
import Styles from "../../scss/components/content/filterTasks.module.scss";
import useDebounce from "../../hooks/useDebounce";

export default function FilterTasks({onChangeFilters}) {
  const [priority, setPriority] = useState('')
  const [search, setSearch] = useState('')

  const debounceSearchTitle = useDebounce(search, 1000)

  useEffect(() => { 
    onChangeFilters({priority, search})
  },[priority,debounceSearchTitle])

  

  return (
    <>
      <div className={Styles.filters}>
        <h3 className={Styles.filtersSubtitle}>Filters</h3>
        <legend>Task title</legend>
        <input 
          type="text" 
          name="titleFilter"
          value={search} 
          placeholder="Enter task name" 
          onChange={(event) => {setSearch(event.target.value)}}/>
        
        <legend>Choose Priority</legend>

        <select
          name="priorityFilter"
          value={priority}
          className={Styles.prioritySelect}
          onChange={(event)=>{setPriority(event.target.value)}}
        >
          <option value="">select...</option>
          <option value="completed">Completed</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </>
  );
}
