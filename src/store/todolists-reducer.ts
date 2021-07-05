import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
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
export type FilterValuesType = "all" | "active" | "completed"
export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistDomainType = {id: action.todoListID,
                title: action.title,
                filter: "all",
            addedDate:"",
                order:0,
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default :
            return state
    }
}


export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}
export const ChangeTodolistTitleAC = (title: string, todoListID: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID: todoListID}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID}
}