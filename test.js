const io = require("socket.io")(3000);

io.on('connection', socket => {
    //socket.on('new-user-joined', codename => {
        //console.log(codename);
        //users[socket.id] = codename;
        //socket.broadcast.emit('member-joined', codename);
    //});

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message' ,message);
    })
})