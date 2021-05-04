import React, {useState, KeyboardEvent, ChangeEvent} from "react";

// <span>{t.title}</span>
type EditableSpan = {
    title: string
    changeTitle:(title:string)=>void
}

function EditableSpan(props: EditableSpan) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return (
        editMode
            ? <input value={title}
                     onChange={onChangeTitle} autoFocus
                     onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;