// bubble sort сортировка пузырьком


const array = [777, 23, 12, 43, 32, 65, 82, 21, 0, 99]

for (let j = 0; j < array.length - 1; j++) {
    for (let i = 0; i < array.length - 1 - j; i++) {
        if (array[i] > array[i + 1]) {
            let temp = array[i + 1]
            array[i + 1] = array[i]
            array[i] = temp
        }
    }
}
console.log(array)


// метод sort

const names = ["Bob", "Alex", "bob", "Donald", "Ramzan", "2021", "кот", "Владимир"]

names.sort()
console.log(names)

const number = [110, 2, 33, 4, 111, 55555]
console.log(number)

//sort -->compareFunc-->a
// a <= 0 не переставляем
// a > 0 переставляем

function comp(a, b) {  // по возрастанию

    if (a <= b) {
        return -1
    } else {
        return 2
    }
}

console.log(number.sort(comp))
const shortComp = (a, b) => a - b // по возрастанию
const shortComp1 = (a, b) => b - a // по убыванию

console.log(number.sort(shortComp))

const students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 95
    },
    {
        name: "Alex",
        age: 23,
        isMarried: true,
        scores: 89
    },
    {
        name: "Helge",
        age: 21,
        isMarried: true,
        scores: 89
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 121
    },
];

//console.log(students.sort((a,b)=>b.scores-a.scores))// по убыванию
//console.log(students.sort((a,b)=>a.age-b.age))//по возрастанию
console.log(students.sort((a, b) => a.name < b.name ? -1 : 1))