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
type TodoType = {
    id: string
    addedDate: string
    order: string
    title: string
}


export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseTodolistType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    },
}


type TaskType = {
    addedDate: string
    deadline: null | any
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | any
    status: number
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