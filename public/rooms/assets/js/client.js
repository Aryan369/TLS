//const _codename = require("./../../../../app");
const socket = io("http://localhost:3000");

const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
const name = prompt("enter your name");

socket.emit('new-user-joined', name);