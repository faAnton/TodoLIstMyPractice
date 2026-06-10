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
    changeTastStatus: (taskID: string, listID: string) => void
}


export function TodoList({title, id, deleteList, tasks, createTask, deleteTask, changeTastStatus}: TodoListProps) {

    let [inputText, setInputText] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        
    }
    const onClickButtonHandler = () => {
        createTask(inputText, id)
        setInputText('')
    }
    // const deleteButtonHandler = (taskID: string) => {
        
    // // }
    
    const [filter, setFilter] = useState<'all' | 'complited'| 'active'>('all')
    let filteredList = [...tasks]
    if(filter ===  'complited') {
        filteredList = tasks.filter(el => el.isDone)
    }
    if(filter ===  'active') {
        filteredList = tasks.filter(el => !el.isDone)
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <input value={inputText} onChange={onChangeInputHandler} type="text"/><Button callback={onClickButtonHandler} title="add"/>
            </div>
            <ul>
                {filteredList.map(task =>  (<li key={task.id}> 
                                            <input onChange={()=> changeTastStatus(task.id, id)} id={task.id} type="checkbox" defaultChecked={task.isDone}/><label htmlFor={task.id}>{task.title}</label>  
                                            <Button callback={() => deleteTask(task.id, id)} title="X"/>
                                        </li>
                                    ))}
            </ul>
            <div>
                <Button callback={()=>setFilter('all')} title="All"/>
                <Button callback={()=>setFilter('active')} title="Active"/>
                <Button callback={()=>setFilter('complited')} title="Complited"/>
            </div>
            <button onClick={() => deleteList(id)}>Delete List </button> 
        </div>
        
    )
}
