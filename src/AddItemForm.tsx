import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";


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
            <TextField
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                variant={"outlined"}
                label={"Title"}
                error={error}
            />
            <IconButton onClick={onClickItem}>
                <AddBox/>
            </IconButton>
            {errorMessage}
        </div>
    )
}

export default AddItemForm