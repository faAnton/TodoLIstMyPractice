
import { useState } from 'react'
import './App.css'
import { CreateList } from './CreateList'
import { TodoList } from './TodoList/TodoList'



function App() {
  let [lists, setLists] = useState([
    { id: crypto.randomUUID(), title: 'cars' },
    { id: crypto.randomUUID(), title: 'books' },
    { id: crypto.randomUUID(), title: 'bear' },
  ])

  let [tasksState, setTasksState] = useState({
    [lists[0].id]: [
      { id: crypto.randomUUID(), title: 'porche', isDone: false },
      { id: crypto.randomUUID(), title: 'audi', isDone: false },
      { id: crypto.randomUUID(), title: 'bmw', isDone: false },
    ],
    [lists[1].id]: [
      { id: crypto.randomUUID(), title: 'Math', isDone: false },
      { id: crypto.randomUUID(), title: 'Biology', isDone: false },
      { id: crypto.randomUUID(), title: 'Geometry', isDone: false },
    ],
    [lists[2].id]: [
      {id: crypto.randomUUID(), title: 'Dark no Filter', isDone: false},
      {id: crypto.randomUUID(), title: 'Sider', isDone: false},
      {id: crypto.randomUUID(), title: 'Zbiten', isDone: false},
    ],
  })

  const deleteList = (id: string) => {
    const newState = lists.filter(el => el.id !== id)
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

  return (
    <>
      <CreateList createList={createList} />

      <div style={{ display: 'flex', gap: '30px' }}>
        {lists.map(list => <TodoList 
                            deleteList={deleteList} 
                            id={list.id} 
                            title={list.title} 
                            tasks={tasksState[list.id]}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            />)}
      </div>

    </>
  )
}

export default App
