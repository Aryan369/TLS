const io = require("socket.io")(3000);

io.on('connection', socket => {
    //socket.on('new-user-joined', codename => {
        //console.log(codename);
        //users[socket.id] = codename;
        //socket.broadcast.emit('member-joined', codename);
    //});

    console.log("user joined");
    socket.emit('chat-message', "hello workd");
})