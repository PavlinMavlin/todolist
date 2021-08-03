import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
 export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean

}

const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false
}


const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    }

})

export const appReducer = slice.reducer
export const setIsInitializedAC = slice.actions.setIsInitializedAC
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setIsInitializedAC({isInitialized: true}))
        } else {

        }

    })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}



