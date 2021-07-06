import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'TodolistAPI',

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "2"
        todolistsAPI.createTodolist(title)
            .then((res) => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8864731f-9df0-4206-ba68-1efad61b2b5e "
        todolistsAPI.deleteTodolist(todolistId)
            .then((res => {
                setState(res.data)
            }))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd073ec7d-134e-4c3a-9e29-c8f255e68fe8'
        const title = 'REACT>>>>>>>>>'
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

