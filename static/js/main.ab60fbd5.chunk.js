(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{61:function(t,e,n){t.exports=n(72)},66:function(t,e,n){},70:function(t,e,n){},72:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(8),o=n.n(r);n(66),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(26),l=(n(70),n(27)),s=n(104),u=n(113),d=n(103);var m=function(t){var e=Object(a.useState)(""),n=Object(l.a)(e,2),r=n[0],o=n[1],c=Object(a.useState)(!1),m=Object(l.a)(c,2),f=m[0],T=m[1],E=function(){var e=r.trim();e?t.addItem(e):T(!0),o("")},O=f?i.a.createElement("div",{style:{color:"red"}},"Title is required"):null;return i.a.createElement("div",null,i.a.createElement(u.a,{value:r,onChange:function(t){o(t.currentTarget.value),T(!1)},onKeyPress:function(t){"Enter"===t.key&&E()},variant:"outlined",label:"Title",error:f}),i.a.createElement(d.a,{onClick:E},i.a.createElement(s.a,null)),O)};var f=function(t){var e=Object(a.useState)(!1),n=Object(l.a)(e,2),r=n[0],o=n[1],c=Object(a.useState)(t.title),s=Object(l.a)(c,2),d=s[0],m=s[1];return r?i.a.createElement(u.a,{color:"primary",variant:"standard",value:d,onChange:function(t){m(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),t.changeTitle(d)}}):i.a.createElement("span",{onDoubleClick:function(){return o(!0)}},t.title)},T=n(114),E=n(106),O=n(105);function I(t){var e=t.tasks.map((function(e){return i.a.createElement("li",{key:e.id},i.a.createElement("span",{className:e.isDone?"is-done":""},i.a.createElement(T.a,{color:"primary",checked:e.isDone,onChange:function(n){return t.changeTaskStatus(e.id,n.currentTarget.checked,t.todoListID)}}),i.a.createElement(f,{title:e.title,changeTitle:function(n){return t.changeTaskTitle(e.id,n,t.todoListID)}})),i.a.createElement(d.a,{onClick:function(){t.removeTask(e.id,t.todoListID)},color:"secondary"},i.a.createElement(O.a,null)))}));return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(f,{title:t.title,changeTitle:function(e){return t.changeTodolistTitle(e,t.todoListID)}}),i.a.createElement(d.a,{onClick:function(){return t.removeTodoList(t.todoListID)},color:"secondary"},i.a.createElement(O.a,null))),i.a.createElement(m,{addItem:function(e){t.addTask(e,t.todoListID)}}),i.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0px"}},e),i.a.createElement("div",null,i.a.createElement(E.a,{size:"small",variant:"all"===t.filter?"contained":"outlined",color:"primary",onClick:function(){return t.changeFilter("all",t.todoListID)}},"All"),i.a.createElement(E.a,{style:{marginLeft:"3px"},size:"small",variant:"active"===t.filter?"contained":"outlined",color:"primary",onClick:function(){return t.changeFilter("active",t.todoListID)}},"Active"),i.a.createElement(E.a,{size:"small",variant:"completed"===t.filter?"contained":"outlined",color:"primary",onClick:function(){return t.changeFilter("completed",t.todoListID)}},"Completed")))}var D=n(107),v=n(73),b=n(108),p=n(109),j=n(111),L=n(112),h=n(110),g=n(10),k=n(37),y=n(115),S=[],A=n(20),C={};var w=function(){var t=Object(c.c)((function(t){return t.todolists})),e=Object(c.c)((function(t){return t.tasks})),n=Object(c.b)();function a(t,e,a){n({type:"CHANGE-TASK-TITLE",title:e,todolistId:a,taskID:t})}function r(t,e){n(function(t,e){return{type:"ADD-TASK",title:t,todolistId:e}}(t,e))}function o(t,e,a){n(function(t,e,n){return{type:"CHANGE-TASK-STATUS",taskID:t,isDone:e,todolistId:n}}(t,e,a))}function l(t,e){n(function(t,e){return{type:"REMOVE-TASK",taskID:t,todolistId:e}}(t,e))}function s(t,e){n(function(t,e){return{type:"CHANGE-TODOLIST-FILTER",filter:t,todoListID:e}}(t,e))}function u(t){var e=function(t){return{type:"REMOVE-TODOLIST",todoListID:t}}(t);n(e)}function f(t,e){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",title:t,todoListID:e}}(t,e))}function T(t){switch(t.filter){case"active":return e[t.id].filter((function(t){return!1===t.isDone}));case"completed":return e[t.id].filter((function(t){return!0===t.isDone}));default:return e[t.id]}}var O=t.map((function(t){return i.a.createElement(D.a,{item:!0,key:t.id},i.a.createElement(v.a,{elevation:5,style:{padding:"20px"}},i.a.createElement(I,{todoListID:t.id,removeTask:l,filter:t.filter,tasks:T(t),title:t.title,changeFilter:s,addTask:r,changeTaskStatus:o,removeTodoList:u,changeTaskTitle:a,changeTodolistTitle:f})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(b.a,{position:"static"},i.a.createElement(p.a,{style:{justifyContent:"space-between"}},i.a.createElement(d.a,{color:"inherit"},i.a.createElement(h.a,null)),i.a.createElement(j.a,{variant:"h6"},"Todolists"),i.a.createElement(E.a,{variant:"outlined",color:"inherit"},"Login"))),i.a.createElement(L.a,{fixed:!0},i.a.createElement(D.a,{container:!0,style:{padding:"20px 0px"}},i.a.createElement(m,{addItem:function(t){var e=function(t){return{type:"ADD-TODOLIST",title:t,todoListID:Object(y.a)()}}(t);n(e)}})),i.a.createElement(D.a,{container:!0,spacing:3},O)))},N=n(42),K=Object(N.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(g.a)(Object(g.a)({},t),{},Object(A.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskID}))));case"ADD-TASK":var n={id:Object(y.a)(),isDone:!1,title:e.title};return Object(g.a)(Object(g.a)({},t),{},Object(A.a)({},e.todolistId,[n].concat(Object(k.a)(t[e.todolistId]))));case"CHANGE-TASK-STATUS":return Object(g.a)(Object(g.a)({},t),{},Object(A.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskID?Object(g.a)(Object(g.a)({},t),{},{isDone:e.isDone}):t}))));case"CHANGE-TASK-TITLE":return Object(g.a)(Object(g.a)({},t),{},Object(A.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskID?Object(g.a)(Object(g.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(g.a)(Object(g.a)({},t),{},Object(A.a)({},e.todoListID,[]));case"REMOVE-TODOLIST":var a=Object(g.a)({},t);return delete a[e.todolistId],a;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todoListID}));case"ADD-TODOLIST":var n={id:e.todoListID,title:e.title,filter:"all"};return[].concat(Object(k.a)(t),[n]);case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.todoListID?Object(g.a)(Object(g.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todoListID?Object(g.a)(Object(g.a)({},t),{},{filter:e.filter}):t}));default:return t}}}),G=Object(N.b)(K);window.store=G,o.a.render(i.a.createElement(c.a,{store:G},i.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[61,1,2]]]);
//# sourceMappingURL=main.ab60fbd5.chunk.js.map