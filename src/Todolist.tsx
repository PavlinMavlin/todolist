import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {errorMessage} from "jest-validate/build/errors";


export type PropsTypeTodolist = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export function Todolist(props: PropsTypeTodolist) {
    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => <li className={t.isDone ? "is-done" : ""} key={t.id}>
        <input
            onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
            type={"checkbox"}
            checked={t.isDone}
        /><span>{t.title}</span>
        <button onClick={() => {
            props.removeTask(t.id)
        }}>+
        </button>
    </li>)

    const onClickTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle("")

    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAllFilter = () => props.changeFilter("all")
    const onClickActiveFilter = () => props.changeFilter("active")
    const onClickACompletedFilter = () => props.changeFilter("completed")
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null
    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickTask}>+</button>
                {errorMessage}
            </div>
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