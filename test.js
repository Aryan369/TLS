const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 4000;
const io = require("socket.io")(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ["GET", "POST"]
    }
});

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/test.html`);
});


//Socket.io

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', codename => {
        users[socket.id] = codename;
        socket.broadcast.emit('member-joined', codename);
        });
        
        socket.on('send-chat-message', msg => {
            socket.broadcast.emit('chat-message' ,msg);
        });
});




http.listen(PORT, function(){
    console.log("Successfully Connected");

});