import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodoListTitleTC,
    addTodolistTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType
} from "./store/todolists-reducer";
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskStatusTC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistTC())

    }, [])


    //tasks
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleTC(taskId, newTitle, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(taskId, todolistId, status))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(taskID, todoListID))
    }, [dispatch])

//todolist
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(value, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListTC(todoListID)
        // dispatchToTasks(action)
        dispatch(action)

    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)

    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(title, todoListID))
    }, [dispatch])


    const todolistComponents = todoList.map(
        tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: "20px"}}>
                        <Todolist
                            todoListID={tl.id}
                            removeTask={removeTask}
                            filter={tl.filter}
                            tasks={tasks[tl.id]}
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
