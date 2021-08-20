const io = require("socket.io")(8000);

const users = {};

io.on('connect', socket => {
    socket.on('new-user-joined', name => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('member-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, codename: user[socket.id]});
    });
})