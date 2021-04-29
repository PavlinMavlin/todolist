import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "what to learn", filter: "all"},
        {id: todoListId_2, title: "what to buy", filter: "all"}
    ])
    const [task, setTask] = useState<TaskStateType>({
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

    function getTaskForTodolist(todoList: TodolistType) {
        switch (todoList.filter) {
            case "active" :
                return task[todoList.id].filter(t => t.isDone === false)

            case "completed":
                return task[todoList.id].filter(t => t.isDone === true)

            default:
                return task[todoList.id]
        }
    }
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTask({...task, [todoListID]: [newTask, ...task[todoListID]]})
    }
    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        task[todoListID] = task[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTask({...task})
    }
    function removeTask(taskId: string, todoListID: string) {
        task[todoListID] = task[todoListID].filter(t => t.id !== taskId)
        setTask({...task})

    }
    function removeTodoList( todoListID: string){
        setTodoList(todoList.filter(tl=>tl.id!==todoListID))
        delete task[todoListID]
    }
    const todolistComponents = todoList.map(
        tl => {
            return (
                <Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    removeTask={removeTask}
                    filter={tl.filter}
                    tasks={getTaskForTodolist(tl)}
                    title={tl.title}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            )
        }
    )

    return (
        <div className="App">
            {todolistComponents}

        </div>)


}

export default App;
