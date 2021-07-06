import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todoListID: string
    title: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}
export type SetTodoListsActionType = {
    type: "SET-TODOLISTS",
    todolists: Array<TodolistType>
}
export type FilterValuesType = "all" | "active" | "completed"
export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListsActionType

let initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistDomainType = {
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0,
            }
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default :
            return state
    }
}


export const removeTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
export const addTodoListAC = (title: string, todoListID: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todoListID}
}
export const changeTodolistTitleAC = (title: string, todoListID: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID: todoListID}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID}
}
export const setTodoAC = (todolists: Array<TodolistType>): SetTodoListsActionType => {
    return {
        type: "SET-TODOLISTS",
        todolists,
    }
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodos()
        .then((res) => {
            let todos = res.data
            dispatch(setTodoAC(todos))
        })
}

export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then((res) => {
            debugger
            const todolistId = res.data.data.item.id
            const title = res.data.data.item.title
            if (todolistId) {
                dispatch(addTodoListAC(title, todolistId))
            }

        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodoTitle(todoListID, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, todoListID))
        })
}