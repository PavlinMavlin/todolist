import {
    addTaskAC,
    removeTaskAC,

    tasksReducer, updateTaskAC
} from './tasks-reducer';


import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {TaskStateType} from "../../app/App";
import {addTodoListAC} from "./todolists-reducer";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                description: ""
            }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const newTask = {
        id: "4",
        title: "weather",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: ""
    }
    const action = addTaskAC(newTask);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("weather");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {


    const action = updateTaskAC("2", {status:TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('status of specified title should be changed', () => {


    const action = updateTaskAC("2", {title:"vodka"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("vodka");

});
// test('new array should be added when new todolist is added', () => {
//
//
//     const action = addTodoListAC("new todolist");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
//
// test('property with todolistId should be deleted', () => {
//
//
//     const action = RemoveTodolistAC("todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });
//
//







