import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b5f63428-88b9-4342-8c9b-16d46fb30269'
    }
})


type CommonResponseTodolistType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseTodolistType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    },
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}


export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

type ResponsePostTaskType = {
    data: { item: Array<TaskType> }
    totalCount: number
    fieldsErrors: string[]
    messages: string[]
}
type ResponseGetTaskType = {
    error: null
    item: Array<TaskType>
    totalCount: number
}
type ResponseDeleteTaskType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type ResponseUpdateTasTYpe = {
    data: TaskType
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<ResponseGetTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponsePostTaskType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseDeleteTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseUpdateTasTYpe>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }

}