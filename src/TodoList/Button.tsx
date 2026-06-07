type ButtonPropsType = {
    callback: ()=> void;
    title: string
}

export function Button({callback, title}:ButtonPropsType) {
    return (
        <button onClick={callback}>{title}</button>
    )
}
