import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoList = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    //tasks
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone,todolistId))
    }

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }

//todolist
    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodolistFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        // dispatchToTasks(action)
        dispatch(action)

    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatch(action)

    }

    function changeTodolistTitle(title: string, todoListID: string) {
        dispatch(ChangeTodolistTitleAC(title, todoListID))
    }

    //ui
    function getTaskForTodolist(todoList: TodolistType) {
        switch (todoList.filter) {
            case "active" :
                return tasks[todoList.id].filter(t => t.isDone === false)

            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)

            default:
                return tasks[todoList.id]
        }
    }

    const todolistComponents = todoList.map(
        tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: "20px"}}>
                        <Todolist
                            todoListID={tl.id}
                            removeTask={removeTask}
                            filter={tl.filter}
                            tasks={getTaskForTodolist(tl)}
                            title={tl.title}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button variant={"outlined"}
                            color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>)
}

export default AppWithRedux;
