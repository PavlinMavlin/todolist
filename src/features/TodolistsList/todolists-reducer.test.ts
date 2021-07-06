import {
    ActionsType, addTodoListAC, changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodoListAC,
    TodolistDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0
        },
        {
            id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0
        }
    ]
})

test('correct todolist should be removed', () => {


    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {


    let newTodolist = {
        id: v1(), title: "New", filter: "all", addedDate: "",
        order: 0
    };


    const endState = todoListsReducer(startState, addTodoListAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action: ActionsType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action: ActionsType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID: todolistId2,
        filter: newFilter
    };


    const endState = todoListsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
