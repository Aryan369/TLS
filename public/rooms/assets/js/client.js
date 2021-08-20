//const _codename = require("../../../../app");
const socket = io();

const msgform = document.getElementById('send-container');
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");

//const codename = _codename;
const codename = prompt("Enter your name");
JoinedMsg("You");

//Joining Info
socket.emit('new-user-joined', codename);

socket.on('member-joined', codeName => {
    JoinedMsg(codeName);
});



msgInp.addEventListener('keyup', e => {
    if(e.key === "Enter"){
        sendMsg(e.target.value);
    }
});

msgform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = msgInp.value;
    sendMsg(message);
});


//Send Messages
function sendMsg(message){
    let msg = {
        user: "codename",
        message: message.trim()
    }

    appendMsg(msg, "outgoing", "out");
    msgInp.value = "";
    scrollToBottom();
    
    socket.emit('send-chat-message', msg);
}


//Receive Messages
socket.on('chat-message', msg => {
    appendMsg(msg, "incoming", "in");
    scrollToBottom();
});


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

function JoinedMsg(member){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("joined", "msg");

    let markup = `
        <h4>${member} joined the room.</h4>
    `

    mainDiv.innerHTML = markup;
    msgContainer.appendChild(mainDiv);
}

function scrollToBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
}