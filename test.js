const io = require("socket.io")(8000);
const express = require("express");
const ejs = require("ejs");
const RoomsRoute = require("./routes/rooms");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use("/", RoomsRoute);

const users = {};

io.on('connect', socket => {
    socket.on('new-user-joined', codename => {
        console.loh(codename);
        users[socket.id] = codename;
        socket.broadcast.emit('member-joined', codename);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, codename: user[socket.id]});
    });
})

app.listen("3000");