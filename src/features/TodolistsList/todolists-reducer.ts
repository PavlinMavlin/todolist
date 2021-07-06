import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";

let initialState: Array<TodolistDomainType> = []
export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default :
            return state
    }
}

//actions
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID} as const)
export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (title: string, todoListID: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    todoListID: todoListID
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, todoListID: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter: filter,
    todoListID: todoListID
} as const)
export const setTodoAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

//thunks
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setTodoAC(todos))
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {

            dispatch(addTodoListAC(res.data.data.item))

        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todoListID, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, todoListID))
        })
}

//types
export type FilterValuesType = "all" | "active" | "completed"

export type ActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}