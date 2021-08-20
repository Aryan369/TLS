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


io.on('connection', socket => {
    //socket.on('new-user-joined', codename => {
        //console.log(codename);
        //users[socket.id] = codename;
        //socket.broadcast.emit('member-joined', codename);
        //});
        
        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message' ,message);
        });
});




http.listen(PORT, function(){
    console.log("Successfully Connected");

});