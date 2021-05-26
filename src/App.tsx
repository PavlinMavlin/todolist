import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "what to learn", filter: "all"},
        {id: todoListId_2, title: "what to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        setTasks({...tasks})
        //setTasks({...tasks,[todoListID]:tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    function removeTask(taskId: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskId)
        setTasks({...tasks})

    }

//todolist
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {id: newTodolistID, title: title, filter: "all"}
        setTodoList([...todoList, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
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

export default App;
