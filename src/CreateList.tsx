import { useState, type ChangeEvent} from "react"

type CreateListProps = {
    createList:  (title: string) => void
}

export function CreateList({createList}: CreateListProps) {

    let [inputText, setInputText] = useState('')
    const onChangeInputHandler = (e : ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    } 

    const onClickButtonHandler = () => {
        createList(inputText)
        setInputText('')
    }
    return (
        <div>
            <h2>Create List</h2>
            <input value={inputText} onChange={onChangeInputHandler} type='text' /><button onClick={onClickButtonHandler}>Create</button>
        </div>
    )
}
