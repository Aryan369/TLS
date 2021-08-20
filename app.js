require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const socketio = require("socket.io");
const generateTLSID = require("./generateTLS_ID");
const User = require("./models/users");

//Routes
const HomepageRoute = require("./routes/homepage");
const HomepageContactRoute = require("./routes/homepageContact");
const HQRoute = require("./routes/hq");
const RegisterRoute = require("./routes/register");
const LoginRoute = require("./routes/login");
const LogoutRoute = require("./routes/logout");
const RoomsRoute = require("./routes/rooms");

const PORT = process.env.PORT || 3690;

const uri = process.env.DB;

const app = express();
const http = require("http").createServer(app);

//Socket.io
const io = require("socket.io")(http, {
  cors: {
      origin: `http://localhost:${PORT}`,
      methods: ["GET", "POST"]
  }
});

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


//App Config
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(uri, {useNewUrlParser: true}, (err) => {
  if(!err){
    console.log("Connected to database.");
  }else {
    console.log(err);
  }
});
mongoose.set("useCreateIndex", true);

//Passport
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);


//REQUESTS
app.use("/", HomepageRoute);

app.use("/homepageContact", HomepageContactRoute);

//Chats
app.use("/rooms", RoomsRoute)

app.use("/hq", HQRoute);

app.use("/logout", LogoutRoute);

//Post
app.use("/homepage", HomepageRoute);

app.use("/register", RegisterRoute);

app.use("/login", LoginRoute);


app.get('/dev', (req, res) => {
  res.send(`ID: ${generateTLSID.generate()}`);
})

http.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
