
const student = {};
const studentPlus = {};
console.log(student===studentPlus)
student.age = 24 ;
// 1.Константой является операция присваивания
// 2.Если это обькт (array & func) то в переменной хранится
// на этот обьект (адрес этого обьекта)


//поверхностное копирование
const copyStudent = {...student}

student.friends.push('Ann');

// Полное копирование с свойствами

const copyStudent = {...student,friends:[...student.friends]}