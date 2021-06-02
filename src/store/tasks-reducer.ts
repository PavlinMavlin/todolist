import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    isDone: boolean
    todolistId: string
    taskID: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    title: string
    todolistId: string
    taskID: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}
type  RemoveTodolistActionType = {
    todolistId: string
    type: "REMOVE-TODOLIST"
}
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TaskStateType = {

}
// type initialStateType = typeof initialState // более гибко в реальной жизни

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }
        case "ADD-TASK":
            let task: TaskType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return{
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)

            }

            case "CHANGE-TASK-TITLE" : {
            return{
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {...t, title: action.title} : t)

            }

        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todoListID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default :
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS",taskID, isDone, todolistId }
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskID}
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", todolistId}
}
