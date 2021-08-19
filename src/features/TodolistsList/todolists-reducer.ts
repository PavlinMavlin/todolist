import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//thunks
export const fetchTodolistTC = createAsyncThunk("todolist/fetchTodolist", async (param, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        dispatch(setAppErrorAC({error: error.message}))
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})
export const removeTodoListTC = createAsyncThunk("todolist/removeTodolist", async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoListID: todolistId}
    } catch (error) {
        dispatch(setAppErrorAC({error: error.message}))
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk("todolist/addTodolist", async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode == 0) {
        //dispatch(addTodoListAC({todolist: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } else {
        if (res.data.messages.length) {
            dispatch(setAppErrorAC({error: res.data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: "Some error occurred"}))
            return rejectWithValue("Some error occurred")
        }
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})

export const changeTodoListTitleTC = createAsyncThunk("todolist/changeTodoListTitle", (param: { title: string, todoListID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(param.todoListID, param.title)
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return param
    } catch (error) {
        dispatch(setAppErrorAC({error: error.message}))
        dispatch(setAppStatusAC({status: 'failed'}))
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].filter = action.payload.filter
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        });
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            if (index > -1) state.splice(index, 1)
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].title = action.payload.title
        });
    }
})
export const {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,

} = slice.actions
export const todoListsReducer = slice.reducer


//types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

