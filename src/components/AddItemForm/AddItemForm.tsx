import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";
import {RequestStatusType} from "../../app/app-reducer";


  export type AddItemFormPropsType = {
    addItem: (title: string) => void
      disabled?: boolean
}


export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {



    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === "Enter") {
            addItem()
        }
    }
    // const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                label={"Title"}
                error={!!error}
                disabled={props.disabled}
            />
            <IconButton color={"primary"} onClick={addItem} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})

export default AddItemForm