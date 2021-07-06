import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {addTodoListAC, changeTodolistEntityStatusAC, removeTodoListAC, setTodoAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStateType} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";


let initialState: TaskStateType = {}
export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]].map(t => ({
                    ...t,
                    entityStatus: 'idle'
                }))
            }

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case "CHANGE-TASK-ENTITY-STATUS":
            console.log(action)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskID ? {...t, entityStatus: action.entityStatus} : t)
            }
        default :
            return state
    }
}

// Actions
export const changeTaskEntityStatusAC = (taskID: string, todolistId: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TASK-ENTITY-STATUS",
    taskID,
    todolistId, entityStatus
} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const removeTaskAC = (taskID: string, todolistId: string) => ({type: 'REMOVE-TASK', taskID, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: "SET-TASKS",
    todolistId,
    tasks
} as const)

//thunk
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTask(todolistId)
        .then((res) => {

            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const removeTaskTC = (taskID: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(taskID, todolistId, "loading"))
    todolistsAPI.deleteTask(todolistId, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(taskID, todolistId, "succeeded"))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
        })
}

enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export const addTaskTC = (title: string, todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))

    todolistsAPI.createTask(todoListID, title)
        .then((res) => {

            if (res.data.resultCode === ResponseStatuses.success) {
                const task = res.data.data.item

                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })

    }

//types
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof setTodoAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
