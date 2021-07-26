import {setAppErrorAC, setAppStatusAC,} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolists-api';

export const handleServerNetworkError = (dispatch: Dispatch<ErrorAT>, message: string) => {
    dispatch(setAppErrorAC({error:message}))
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorAT>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export type ErrorAT = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>

