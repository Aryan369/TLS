const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(require('cors')())

const http = require("http").createServer(app);
const io = require("socket.io")(3000);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/test.html`);
});

http.listen(4000, function(){
    console.log("Successfully Connected Server");

io.on('connection', socket => {
    //socket.on('new-user-joined', codename => {
        //console.log(codename);
        //users[socket.id] = codename;
        //socket.broadcast.emit('member-joined', codename);
    //});

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message' ,message);
    })
});
});