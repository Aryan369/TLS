//const _codename = require("./../../../../app");
const socket = io();

const msgform = document.getElementById('send-container');
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
//const _name = prompt("enter your name");

// socket.on('chat-message', data => {
//     console.log(data);
// });

msgInp.addEventListener('keyup', e => {
    if(e.key === "Enter"){
        sendMsg(e.target.value);
    }
});

msgform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = msgInp.value;
    sendMsg(message);
    //msgInp.value = "";
});

function sendMsg(message){
    let msg = {
        user: "codename",
        message: message.trim()
    }

    appendMsg(msg, "outgoing", "out");
    
    socket.emit('send-chat-message', msg);
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