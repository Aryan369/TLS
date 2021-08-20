//const _codename = require("./../../../../app");
const socket = io(5500);

const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
const name = "name";

socket.emit('new-user-joined', name);