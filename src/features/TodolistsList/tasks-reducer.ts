import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {addTodoListAC, removeTodoListAC, setTodoAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TasksStateType} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ taskID: string, todolistId: string, entityStatus: RequestStatusType }>) {
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        },
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})  //entityStatus: 'idle' check later !!!!
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'})) //entityStatus: 'idle'check later!!!
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(setTodoAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
    }
})


export const {changeTaskEntityStatusAC, updateTaskAC, removeTaskAC, addTaskAC, setTasksAC} = slice.actions
export const tasksReducer = slice.reducer


//thunk
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTask(todolistId)
        .then((res) => {

            const tasks = res.data.items
            dispatch(setTasksAC({todolistId: todolistId, tasks: tasks}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const removeTaskTC = (taskID: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTaskEntityStatusAC({taskID: taskID, todolistId: todolistId, entityStatus: "loading"}))
    todolistsAPI.deleteTask(todolistId, taskID)
        .then((res) => {
            dispatch(removeTaskAC({taskID: taskID, todolistId: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTaskEntityStatusAC({taskID: taskID, todolistId: todolistId, entityStatus: "succeeded"}))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}

enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export const addTaskTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))

    todolistsAPI.createTask(todoListID, title)
        .then((res) => {

            if (res.data.resultCode === ResponseStatuses.success) {
                const task = res.data.data.item

                dispatch(addTaskAC({task: task}))
                dispatch(setAppStatusAC({status: 'succeeded'}))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({taskID: taskId, todolistId: todolistId, entityStatus: "loading"}))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({
                        taskID: taskId,
                        todolistId: todolistId,
                        entityStatus: "succeeded"
                    }))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })

    }

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
