//const _codename = require("./../../../../app");
const socket = io("http://localhost:4000");

const msgform = document.getElementById('send-container');
const msgInp = document.getElementById("msgInp");
//const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
//const _name = prompt("enter your name");

socket.on('chat-message', data => {
    console.log(data);
});

msgform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = msgInp.value;
    socket.emit('send-chat-message', message);
    msgInp.value = "";
});