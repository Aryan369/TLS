require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const PORT = process.env.PORT || 3690;

const uri = "mongodb+srv://Admin:Admin@TLS@membersdb.cymfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(uri, {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  codename: String,
  passcode: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
  res.render("homepage");
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });

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
app.get("/chats", (req, res) =>{
  if (req.isAuthenticated()){
    res.render("chats");
  } else {
    res.redirect("/login");
  }
})


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

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//Post
app.post("/homepage", function(req, res){
  if(req.body.homepageInp == process.env.REGISTER_CODE){
    res.render("register");
  }else if(req.body.homepageInp == process.env.LOGIN_CODE){
    res.render("login");
  }else{
    res.redirect("https://google.com");
  }
});


app.post("/register", function(req, res){

  User.register({username: req.body.codename}, req.body.passcode, function(err, user){
    if (err) {
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("hq");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.codename,
    passcode: req.body.passcode
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("hq");
      });
    }
  });

});







app.listen(port, function() {
  console.log("Server started on port 3690.");
});
