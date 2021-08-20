//const _codename = require("./../../../../app");
const socket = io();

const msgform = document.getElementById('send-container');
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
//const _name = prompt("enter your name");

socket.on('chat-message', data => {
    console.log(data);
});

msgform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = msgInp.value;
    sendMsg(message);
    //socket.emit('send-chat-message', message);
    //msgInp.value = "";
});

function sendMsg(message){
    let msg = {
        user: codename,
        message: message
    }

    appendMsg(msg, "outgoing", "out");

    // const msgElement = document.createElement("div");
    // msgElement.innerText = msg;
    // msgContainer.appendChild()
}

function appendMsg(msg, divtype, pType){
    let mainDiv = document.createElement("div");
    let divClass = divtype;
    mainDiv.classList.add(divClass, "msg");

    let markup = `
        <h4>${msg.user}</h4>
        <p class="${pType}">${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    msgContainer.appendChild(mainDiv);
}