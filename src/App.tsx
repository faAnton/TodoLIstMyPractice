
import { useState } from 'react'
import './App.css'
import { CreateList } from './CreateList'
import { TodoList } from './TodoList/TodoList'

const LIST__STATE = [
    { id: crypto.randomUUID(), title: 'cars' },
    { id: crypto.randomUUID(), title: 'books' },
    // { id: crypto.randomUUID(), title: 'bear' },
  ]

const TASKS__STATE = {
    [LIST__STATE[0].id]: [
      { id: crypto.randomUUID(), title: 'porche', isDone: false },
      { id: crypto.randomUUID(), title: 'audi', isDone: true },
      { id: crypto.randomUUID(), title: 'bmw', isDone: false },
    ],
    [LIST__STATE[1].id]: [
      { id: crypto.randomUUID(), title: 'Math', isDone: true },
      { id: crypto.randomUUID(), title: 'Biology', isDone: false },
      { id: crypto.randomUUID(), title: 'Geometry', isDone: false },
    ],
  }


export function App() {
  const [lists, setLists] = useState(LIST__STATE)
  
  const [tasksState, setTasksState] = useState(TASKS__STATE)
  console.log(tasksState);
  
  const deleteList = (ID: string) => {
    const newTasksState = {...tasksState}
    delete newTasksState[ID]
    setTasksState(newTasksState)
    const newState = lists.filter(el => el.id !== ID)
    setLists(newState)
  }

  const createList = (title: string) => {
    const newList = { id: crypto.randomUUID(), title }
    const newState = [...lists, newList]
    const newTasks = {...tasksState, [newList.id]: []}
    
    setLists(newState)
    setTasksState(newTasks)
  }

  const createTask = (title: string, listID: string) => {
    const newTaskState = [...tasksState[listID], {id: crypto.randomUUID(), title, isDone: false}]
    const copyTasks = {...tasksState, [listID]: newTaskState}
    setTasksState(copyTasks)
  }

  const deleteTask = (taskID: string, listID: string) => {
    const newTaskState = tasksState[listID].filter(el => el.id !== taskID)
    const copyTasks = {...tasksState, [listID]: newTaskState}
    setTasksState(copyTasks)
  }

  const changeTastStatus = (taskID: string, listID: string) => {
    const newTaskState = tasksState[listID].map(el => el.id === taskID ? {...el, isDone: !el.isDone}: el) // доработать
    const copyTasks = {...tasksState, [listID]: newTaskState}
    
    setTasksState(copyTasks)
  }
  return (
    <>
      <CreateList createList={createList} />

      <div style={{ display: 'flex', gap: '30px' }}>
        {lists.map(list => <TodoList 
                            key={list.id}
                            deleteList={deleteList} 
                            id={list.id} 
                            title={list.title} 
                            tasks={tasksState[list.id]}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            changeTastStatus={changeTastStatus}
                            />)}
      </div>

    </>
  )
}

