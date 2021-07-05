import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./store/todolists-reducer";


type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<Array<TodolistDomainType>>([
        {id: todoListId_1, title: "what to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListId_2, title: "what to buy", filter: "all", addedDate: " ", order: 0},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {
                id: v1(),
                title: "html&css",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(),
                title: "home work",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(),
                title: "sport",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },

        ],
        [todoListId_2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(),
                title: "Meat",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },

            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
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
            status: TaskStatuses.New, todoListId: todoListID, startDate: "", addedDate: "",
            deadline: "", order: 0, priority: TaskPriorities.Low, description: ""
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskId: string, status: TaskStatuses, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, status: status} : t)
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
        const newTodolist: TodolistDomainType = {
            id: newTodolistID, title: title, filter: "all", addedDate: "",
            order: 0
        }
        setTodoList([...todoList, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    //ui
    function getTaskForTodolist(todoList: TodolistDomainType) {
        switch (todoList.filter) {
            case "active" :
                return tasks[todoList.id].filter(t => t.status === TaskStatuses.New)

            case "completed":
                return tasks[todoList.id].filter(t => t.status === TaskStatuses.Completed)

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
