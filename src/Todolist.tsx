import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {errorMessage} from "jest-validate/build/errors";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditTableSpan";


export type PropsTypeTodolist = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodolistTitle:(title: string, todoListID: string)=>void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
}

export function Todolist(props: PropsTypeTodolist) {
    // const [title, setTitle] = useState<string>("")
    // const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => {
        const changeTaskTile = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListID)
        const removeTask=() => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus=(e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li className={t.isDone ? "is-done" : ""} key={t.id}>
                <input
                    onChange={changeTaskStatus}
                    type={"checkbox"}
                    checked={t.isDone}
                />
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTile}/>
                <button onClick={removeTask}>x
                </button>
            </li>)
    })

    // const onClickTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle, props.todoListID)
    //     } else {
    //         setError(true)
    //     }
    //
    //     setTitle("")
    //
    // }
    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         onClickTask()
    //     }
    // }
    //
    // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }
    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickACompletedFilter = () => props.changeFilter("completed", props.todoListID)
    // const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null
    const OnclickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const changeTodolistTitle=(title:string)=>props.changeTodolistTitle(title,props.todoListID)
    return (

        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={OnclickRemoveTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input className={error ? "error" : ""}*/}
            {/*           value={title}*/}
            {/*           onChange={onChangeTitle}*/}
            {/*           onKeyPress={onKeyPressAddTask}*/}
            {/*    />*/}
            {/*    <button onClick={onClickTask}>+</button>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}
            <ul>
                {
                    tasksJSXElements
                }
            </ul>


            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllFilter}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickACompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}