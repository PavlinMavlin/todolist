import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import App from "./App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

function AppWithReducer() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: "what to learn", filter: "all"},
        {id: todoListId_2, title: "what to buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "html&css", isDone: true},
            {id: v1(), title: "home work", isDone: true},
            {id: v1(), title: "sport", isDone: false},

        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })

    //tasks
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, newIsDoneValue, todoListID))
    }

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

//todolist
    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoList(ChangeTodolistFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        // dispatchToTasks(action)
        dispatchToTodoList(action)

    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        dispatchToTodoList(ChangeTodolistTitleAC(title, todoListID))
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

export default AppWithReducer;
