import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

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

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {id: action.todoListID, title: action.title, filter: "all"}
            return [...todoLists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default :
            return todoLists
    }
}


export const RemoveTodoListAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID: todolistId}
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