import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type PropsTypeTodolist = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
}

export function Todolist(props: PropsTypeTodolist) {

    const tasksJSXElements = props.tasks.map(t => {
        const changeTaskTile = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListID)
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        return (
            <li key={t.id}>
                 <span className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                     <EditableSpan title={t.title} changeTitle={changeTaskTile}/>
                 </span>
                <IconButton
                    onClick={removeTask}
                    color={"secondary"}><Delete/></IconButton>
            </li>)
    })
    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickACompletedFilter = () => props.changeFilter("completed", props.todoListID)
    const OnclickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)
    return (

        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton
                    onClick={OnclickRemoveTodoList} color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {
                    tasksJSXElements
                }
            </ul>


            <div>
                <Button size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickAllFilter}>All
                </Button>
                <Button style={{marginLeft: "3px"}}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickActiveFilter}>Active
                </Button>
                <Button size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickACompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}