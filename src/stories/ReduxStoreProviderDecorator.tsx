import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {todoListsReducer} from "../store/todolists-reducer";
import {tasksReducer} from "../store/tasks-reducer";
import {AppRootStateType} from "../store/store";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate: "",
            order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,todoListId:"todolistId1",startDate:"",addedDate: "",
                deadline: "",order:0,priority:TaskPriorities.Low,description: ""},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,todoListId:"todolistId1",startDate:"",addedDate: "",
                deadline: "",order:0,priority:TaskPriorities.Low,description: ""}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,todoListId:"todolistId2",startDate:"",addedDate: "",
                deadline: "",order:0,priority:TaskPriorities.Low,description: ""},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed,todoListId:"todolistId2",startDate:"",addedDate: "",
                deadline: "",order:0,priority:TaskPriorities.Low,description: ""}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
