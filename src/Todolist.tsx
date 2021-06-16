import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo((props: PropsTypeTodolist) => {

        console.log("Todolist called")

        const getTasksForTodoList = () => {
            switch (props.filter) {
                case "active":
                    return props.tasks.filter((t) => !t.isDone)
                case "completed":
                    return props.tasks.filter((t) => t.isDone)
                default:
                    return props.tasks
            }
        }

        let newTasks = getTasksForTodoList()

        const tasksJSXElements = newTasks.map(t => {


            return (
                <Task key={t.id}
                      task={t}
                      todoListID={props.todoListID}
                      changeTaskStatus={props.changeTaskStatus}
                      changeTaskTitle={props.changeTaskTitle}
                      removeTask={props.removeTask}
                />)
        })

        const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todoListID), [props.changeFilter, props.todoListID])
        const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todoListID), [props.changeFilter, props.todoListID])
        const onClickACompletedFilter = useCallback(() => props.changeFilter("completed", props.todoListID), [props.changeFilter, props.todoListID])

        const OnclickRemoveTodoList = () => props.removeTodoList(props.todoListID)

        const addTask = useCallback((title: string) => {
            props.addTask(title, props.todoListID)
        }, [props.addTask, props.todoListID])

        const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todoListID), [props.changeTodolistTitle, props.todoListID])

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
)
// let taskForTodolist = props.tasks;
// if(props.filter === "active") {
//     taskForTodolist = taskForTodolist.filter(t => !t.isDone)
// }
// if(props.filter === "completed") {
//     taskForTodolist = taskForTodolist.filter(t => t.isDone)
// }
// const getTasksForTodoList = () => {
//     switch (props.filter) {
//         case "active":
//             return props.tasks.filter((t) => !t.isDone)
//         case "completed":
//             return props.tasks.filter((t) => t.isDone)
//         default:
//             return props.tasks
//     }
// }
//
// let newTasks = getTasksForTodoList()


