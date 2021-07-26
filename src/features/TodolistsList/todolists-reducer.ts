import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: Array<TodolistDomainType> = []
const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            if (index > -1) state.splice(index, 1)
        },
        addTodoListAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].filter = action.payload.filter
        },
        setTodoAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        },
    }

})
export const {
    changeTodolistEntityStatusAC,
    removeTodoListAC,
    addTodoListAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodoAC
} = slice.actions
export const todoListsReducer = slice.reducer

//thunks
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setTodoAC({todolists: todos}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodoListAC({todoListID: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            debugger
            if (res.data.resultCode == 0) {
                dispatch(addTodoListAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "Some error occurred"}))
                }
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(todoListID, title)
        .then(() => {
            dispatch(changeTodolistTitleAC({title: title, todoListID: todoListID}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}

//types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

