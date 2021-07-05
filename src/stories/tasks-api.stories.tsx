import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/todolist-api";

export default {
    title: 'TaskAPI',
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf3bdb01-4ecd-4508-ac64-9b37c75a1d0d"
        taskAPI.getTask(todolistId)
            .then((res) => {
               //console.log(res.data)
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cf3bdb01-4ecd-4508-ac64-9b37c75a1d0d"
        const title = "Weather hot"
        taskAPI.createTask(todolistId, title)
            .then((res => {
                 //console.log(res.data)
                setState(res.data)
            }))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            const todolistId = "cf3bdb01-4ecd-4508-ac64-9b37c75a1d0d"
            const taskId = "73e51308-7463-4953-9244-61b1fb8b66fd"
            taskAPI.deleteTask(todolistId, taskId)
                .then((res => {

                    setState(res.data)
                }))
        }
        , [])

    return <div> {JSON.stringify(state)}</div>
}
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = "cf3bdb01-4ecd-4508-ac64-9b37c75a1d0d"
//         const taskId = "d1693eff-6d71-4271-b92a-d424810f68f4"
//         const model = "changedTask"
//         taskAPI.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 console.log(res.data)
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

