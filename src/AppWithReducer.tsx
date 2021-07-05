import React, {useReducer} from 'react';
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
    FilterValuesType,
    RemoveTodoListAC,
    TodolistDomainType,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//  type FilterValuesType = "all" | "active" | "completed"

//  type TodolistType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
//
// }
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, dispatchToTodoList] = useReducer(todoListsReducer, [
        {
            id: todoListId_1, title: "what to learn", filter: "all", addedDate: "",
            order: 0
        },
        {
            id: todoListId_2, title: "what to buy", filter: "all", addedDate: "",
            order: 0
        }
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
                id: v1(), title: "home work", status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(), title: "sport", status: TaskStatuses.Completed,
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
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(), title: "Meat", status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.Completed,
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
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, status: TaskStatuses, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, status, todoListID))
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

export default AppWithReducer;
