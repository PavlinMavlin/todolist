import React from 'react';
import {FilterValuesTypes} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsTypeTodolist = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID:number) => void
    changeFilter:(value:FilterValuesTypes)=>void
}

export function Todolist(props: PropsTypeTodolist) {
    const tasks = props.tasks.map((t) => {
        const removeTask = () => { props.removeTask(t.id) }
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}





