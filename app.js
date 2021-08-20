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
const io = socketio(server).listen(server);

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

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
});



//REQUESTS
app.use("/", HomepageRoute);

app.use("/homepageContact", HomepageContactRoute);

app.get("/secrets", function(req, res){
  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if (err){
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    }
  });
});

//Chats
app.use("/rooms", RoomsRoute)

app.use("/hq", HQRoute);

app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function(req, res){
  const submittedSecret = req.body.secret;

//Once the user is authenticated and their session gets saved, their user details are saved to req.user.
  // console.log(req.user.id);

  User.findById(req.user.id, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function(){
          res.redirect("/secrets");
        });
      }
    }
  });
});

app.use("/logout", LogoutRoute);

//Post
app.use("/homepage", HomepageRoute);

app.use("/register", RegisterRoute);

app.use("/login", LoginRoute);


app.get('/dev', (req, res) => {
  res.send(`ID: ${generateTLSID.generate()}`);
})


//INFO FOR ROOMS
let client_codename;
module.exports = client_codename;

http.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
