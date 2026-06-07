import { useState, type ChangeEvent } from "react"
import { Button } from "./Button"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    title: string
    id: string
    deleteList: (id: string) => void
    tasks: TaskType[]
    createTask: (title: string, listID: string) => void
    deleteTask: (taskID: string, listID: string) => void
}


export function TodoList({title, id, deleteList, tasks, createTask, deleteTask}: TodoListProps) {

    let [inputText, setInputText] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        
    }

    const onClickButtonHandler = () => {
        createTask(inputText, id)
        setInputText('')
    }

    const deleteButtonHandler = (taskID: string) => {
        deleteTask(taskID, id)
    }
    
    return (
        <div>
            <h1>{title}</h1>
            <div>
                <input value={inputText} onChange={onChangeInputHandler} type="text"/><Button callback={onClickButtonHandler} title="add"/>
            </div>
            <ul>
                {tasks.map(task =>  <li key={task.id}> <input type="checkbox" defaultChecked={task.isDone}/> {task.title} <Button callback={() => deleteButtonHandler(task.id)} title="X"/></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complited</button>
            </div>
            <button onClick={ () =>deleteList(id)}>Delete List </button> 
        </div>
        
    )
}
