//const socket = io();
//const codename = require("./app");

//let _codename = codename; 

let msgArea = document.querySelector(".msg_area");
let textarea = document.querySelector("#textarea");
let sendbtn = document.querySelector("#sendbtn");

let _msg = textarea.value;

var ans = prompt("Alert");

textarea.addEventListener("keyup", (e) => {
    if(e.key === 'Enter'){
        sendMsg(e.target.value);
    }
});

sendbtn.addEventListener("click", sendMsg())

function sendMsg(message) {
    let msg = {
        user: _codename,
        msg: message
    }

    appendMsg(msg, "outgoing", "out");
}

function appendMsg(msg, type, msgtype) {
    let mainDiv = document.createElement("div");
    let type = type;
    
    mainDiv.classList.add("msg", type);

    let markup = `
        <h4>${msg.user}</h4>
        <p class="${msgtype}">${msg.msg}</p>
    `

    mainDiv.innerHTML = markup;

    msgArea.appendChild(mainDiv);
}