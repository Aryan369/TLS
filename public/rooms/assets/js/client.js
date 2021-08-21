const socket = io();

let ting = document.getElementById("ting");

const msgform = document.getElementById('send-container');
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".msg_area");
const chatSection = document.querySelector(".chat_section");

// const codename = prompt("Enter your name");
let codename;

// Getting Codename from Server
const body = document.getElementById("body_codename");
body.onload = getCodename();

function getCodename() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'contr', false);

    xhr.onload = () => {
        if(this.staus === 200){
            let obj = JSON.parse(this.responseText);
            codename = JSON.stringify(obj);
            //alert(obj);
        } else {
            console.error(this.error);
        }
    }

    xhr.send();
}


//Joining Info
JoiningMsg("You", "joined");
socket.emit('new-user-joined', codename);

socket.on('member-joined', codeName => {
    JoiningMsg(codeName, "joined");
});

socket.on('member-left', codeName => {
    JoiningMsg(codeName, "left");
});



msgInp.addEventListener('keyup', e => {
    if(msgInp.value.trim() != ''){
        if(e.key === "Enter"){
            sendMsg(e.target.value);
        }
    }
});

msgform.addEventListener('submit', e =>{
    e.preventDefault();
    const message = msgInp.value;
    if(msgInp.value.trim() != ''){
        sendMsg(message);
    }
});


//Send Messages
function sendMsg(message){
    let msg = {
        user: codename,
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
    ting.play();
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

function JoiningMsg(member, type){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("joined", "msg");

    let markup = `
        <h4>${member} ${type} the room.</h4>
    `

    mainDiv.innerHTML = markup;
    msgContainer.appendChild(mainDiv);
}

function scrollToBottom() {
    chatSection.scrollTop = chatSection.scrollHeight;
}