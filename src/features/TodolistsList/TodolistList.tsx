import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {TaskStateType} from "../../app/App";
import {Redirect} from "react-router-dom";


export const TodolistsList: React.FC = () => {
    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchTodolistTC())
    }, [])

    console.log(tasks)


    //tasks
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(taskID, todoListID))
    }, [dispatch])

//todolist
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC({filter:value, todoListID: todoListID}))
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
                            entityStatus={tl.entityStatus}
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

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: "20px 0px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolistComponents
            }
        </Grid>
    </>
}
