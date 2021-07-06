import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";

let initialState: Array<TodolistDomainType> = []
export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default :
            return state
    }
}

//actions
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    entityStatus, id
} as const)
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
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setTodoAC(todos))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            debugger
            if (res.data.resultCode == 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error occurred"))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.updateTodolist(todoListID, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, todoListID))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
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
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}