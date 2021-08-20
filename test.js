const io = require("socket.io")(process.env.PORT || 5500);

const users = {};

io.on('connect', socket => {
    socket.on('new-user-joined', codename => {
        users[socket.id] = codename;
        socket.broadcast.emit('member-joined', codename);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, codename: user[socket.id]});
    });
})