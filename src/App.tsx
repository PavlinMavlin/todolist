import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


export type FilterValuesTypes='all' | 'active' | 'completed'

function App() {
//bll:данные
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Yo", isDone: false},
    ])
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        console.log(tasks)
        setTasks(filteredTasks)
    }
    function changeFilter(value:FilterValuesTypes){
        setFilter(value)
    }

    function getTasksForTodolist(){
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    //ui: интерфейс
    return (
        <div className="App">
            <Todolist
                removeTask={removeTask}
                title="what to learn"
                tasks={getTasksForTodolist()}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
