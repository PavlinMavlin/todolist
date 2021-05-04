// Событие -->event
// Обработчик --> (handler), слушатель ---listener , подписчик --> subcriber
// Создает спец обьукт  в котором собраны сведения о произошедшем событии(event,e,ev)
// БРАУЗЕР вызывает колбэк (обработчик)
// Обьект (e) по умолчанию передается


const sm = document.getElementById("small")
const md = document.getElementById("medium")
const bg = document.getElementById("big")

//
// sm.onclick = () => alert("you")
// //sm.onclick= null отменяет событие
//
// const fn = () => alert("you")
// sm.onclick = fn
//
// console.dir(sm)


function onClickHandler(event) {
    event.stopPropagation() //останавливает событие
    console.log(event.target.name)
}

//sm.onmouseover= onClickHandler
md.onclick = onClickHandler
//sm.onmouseleave = onClickHandler

bg.onclick = () => alert("hey")
