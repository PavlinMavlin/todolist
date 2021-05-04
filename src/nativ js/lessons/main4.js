const tlID_1 = "34JF"

const tlID_2 = "52vvv"

const todolist = [
    {
        id: tlID_1,
        title: "what to learn",
        filter: "all",

    },
    {
        id: tlID_2,
        title: "what to buy",
        filter: "all",
    },
]


const tasks = {
    [tlID_1]: [
        {name: "html", isDone: true},
        {name: "css", isDone: true},
    ],
    [tlID_2]: [
        {name: "react", isDone: true},
        {name: "gre", isDone: true},
    ]


}

let number = [2, 3, 5, 6]
console.log(number.reduce((acc, el) => acc + el, 0))//сумма массива
console.log(number.reduce((acc, el) => acc > el ? acc : el))// максимум массива


let students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85
    },
    {
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 89
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    }, {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100
    }
];


function findAlex(acc, el) {
    if (el.name === "Alex") {
        acc = el
    }
    return acc
}

console.log(students.reduce(findAlex, null))


function getBestStudent(acc, el) {
    if (el.scores >= 100) {
        acc.push(el)
    }
    return acc
}

console.log(students.reduce(getBestStudent, []))


function addScored(acc,el){
 acc.push({...el,scores:el.scores+10})
    return acc
}

console.log(students.reduce(addScored,[]))