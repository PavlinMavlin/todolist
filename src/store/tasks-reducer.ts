import {taskAPI, TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";

import {SetTodoListsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    status: TaskStatuses
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
type SetTasksActionType = {
    type: "SET-TASKS",
    todolistId: string
    tasks: Array<TaskType>
}
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | SetTasksActionType


let initialState: TaskStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }
        case "ADD-TASK":
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.status
                } : t)

            }

        case "CHANGE-TASK-TITLE" : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)

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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, status, todolistId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskID}
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", todolistId}
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: "SET-TASKS",
        todolistId,
        tasks,
    }
}

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTask(todolistId)
        .then((res) => {

            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}

export const removeTaskTC = (taskID: string, todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todolistId))
        })
}
export const addTaskTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todoListID, title)
        .then((res) => {

            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            taskAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}
export const changeTaskTitleTC = (taskID: string, title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {


    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskID
    })

    if (task) {
        taskAPI.updateTask(todolistId, taskID, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        })
            .then((res) => {
                dispatch(changeTaskTitleAC(taskID, title, todolistId))
            })
    }
}
