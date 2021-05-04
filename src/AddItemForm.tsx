import React, {useState, KeyboardEvent, ChangeEvent} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle("")

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickItem()
        }
    }
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}
            />
            <button onClick={onClickItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm