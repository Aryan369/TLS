const _codename = require("./../../../../app");
const socket = io(5500);

const form = document.getElementById("send-form");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

const codename = _codename;

socket.emit('new-user-joined', codename);