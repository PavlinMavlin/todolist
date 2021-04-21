// const student = {};
// const studentPlus = {};
// console.log(student===studentPlus)
// student.age = 24 ;
// // 1.Константой является операция присваивания
// // 2.Если это обькт (array & func) то в переменной хранится
// // на этот обьект (адрес этого обьекта)
//
//
// //поверхностное копирование
// const copyStudent = {...student}
//
// student.friends.push('Ann');
//
// // Полное копирование с свойствами
//
// const copyStudent = {...student,friends:[...student.friends]}
// 1.
// for (let i = 1; i <= 100; i++) {
//
//     document.write(i + '<br>');
// }
// ;


//2. for(let i=1;i<=100;i++){
//
//     if (i % 2 === 0){
//
//         document.write(i + '<br>');
//     }

//3.
// let arr = [];
//
// for (let i = 0; i <= 9; i++) {
//     arr[i]="X"
// }
// console.log(arr)
// document.write(arr)

//5.

//Math.floor(Math.random() * 11).toFixed(2) случайные числа от 1 до 10
//
// let arr=[];
// for(let i=1;i<=10;i++){
//     arr.push(i);
// }
// console.log(arr);

//6. let arr=[];
//
// for(let i=1;i<=10;i++){
//     arr.push(Math.random().toFixed(2))
// }
// console.log(arr)
//7.
// let arr=[];
//
// for(let i=1;i<=10;i++){
//     arr.push(Math.floor(Math.random() * 11))
// }
// console.log(arr)
//8.

// let arr = [3, 5, 6, 7, 8, 2, 14, 16];
//
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > 0 && arr[i] < 10) {
//         document.write(arr[i] + ' ');
//     }
// }
//9.
// let arr = [3, 5, 6, 7, 8, 2, 14, 16];
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 5) {
//         document.write("Есть");
//         break;
//
//     }
// }

//10
// let arr = [3, 4, 3]
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//     sum = sum + arr[i]
// }
//
// console.log(sum)
//11

// let arr = [3, 3]
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//     sum = sum + (arr[i] * arr[i])
// }
// console.log(sum)

//12
// let arr = [3, 3,4,2]
// let sum = 0;
// let val=0;
// for (let i = 0; i < arr.length; i++) {
//     sum = sum + arr[i]
//
//
// }
// console.log(sum/arr.length)

// 3 lesson
//----------------------------------------------------------------------------

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

console.log(students.map(st => ({...st, age: st.age + 1})))

function map(array, func) { // возвращает новый массив
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray[i] = func(array[i])
    }


    return newArray
}

function map(array, func) {// перебирает просто
    const newArr = [];
    array.forEach(st => {
        newArr.push(func(st))
    })
    return newArr
}

function filter(array, func) { // Метод фильтр
    const newArray = [];

    for (let i = 0; i < array.length; i++) {

        if (func(array[i]) === true) {
            newArray.push(array[i])
        }
        return newArray
    }



}

function getNotMarriedStudent(st) {
    return !st.isMarried === false
}

console.log(filter(students,st=>!st.isMarried))
//console.log(map(students, st => ({...st, age: st.age + 1})))




