import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {addTodolistTC, fetchTodolistTC, removeTodoListTC} from "./todolists-reducer";
import {TasksStateType} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunk
export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTask(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistId: todolistId, tasks: tasks}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskID: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        taskID: param.taskID,
        todolistId: param.todolistId,
        entityStatus: "loading"
    }))
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskID)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        taskID: param.taskID,
        todolistId: param.todolistId,
        entityStatus: "succeeded"
    }))
    return {taskID: param.taskID, todolistId: param.todolistId}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { title: string, todoListID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistsAPI.createTask(param.todoListID, param.title)
        if (res.data.resultCode === ResponseStatuses.success) {
            const task = res.data.data.item
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue({})
    }
})

export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state')
        return rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTaskEntityStatusAC({taskID: param.taskId, todolistId: param.todolistId, entityStatus: "loading"}))

    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTaskEntityStatusAC({
                taskID: param.taskId,
                todolistId: param.todolistId,
                entityStatus: "succeeded"
            }))
            return param
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(dispatch, error.message)
        return rejectWithValue({})
    }


})


const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ taskID: string, todolistId: string, entityStatus: RequestStatusType }>) {
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks.splice(index, 1)
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'})
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        })
    }
})


export const {changeTaskEntityStatusAC} = slice.actions
export const tasksReducer = slice.reducer


enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
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
