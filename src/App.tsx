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

function App() {

    let [task, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "html&css", isDone: true},
        {id: v1(), title: "home work", isDone: true},
        {id: v1(), title: "sport", isDone: false},
        {id: v1(), title: "gggggg", isDone: true},
        {id: v1(), title: "fff", isDone: false},

    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let taskForTodolist = task

    switch (filter) {
        case "active":
            taskForTodolist = task.filter(t => t.isDone === false)
            break;
        case "completed":
            taskForTodolist = task.filter(t => t.isDone === true)
            break;
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTask([newTask, ...task])
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean) {
        setTask(task.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    function removeTask(taskId: string) {
        let filteredTask = task.filter(t => t.id !== taskId)
        console.log(task)
        setTask(filteredTask)
    }


    return (
        <div className="App">
            <Todolist removeTask={removeTask}
                      filter={filter}
                      tasks={taskForTodolist}
                      title={"what to learn"}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />

        </div>)


}

export default App;
