require('dotenv').config();
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const generateTLSID = require("../generateTLS_ID");
const User = require("../models/users");
const rootDir = generateTLSID.rootDir;

let __codename = 'dev';

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

const Homepage = {
    Get: (req, res) => {
        //res.render("hq", {_codename: "dev", _rank: "dev" , _TLS_ID: "dev"});
        res.render("homepage");
    },

    Post: (req, res) => {
        if(req.body.homepageInp == process.env.REGISTER_CODE){
            res.render("register");
        }else if(req.body.homepageInp == process.env.LOGIN_CODE){
            res.render("login");
        }else{
            res.redirect("/homepageContact");
        }
    }
}

const HomepageContact = (req, res) => {
    res.render("homepageContact");
}

const HQ = (req, res) => {
    if (req.isAuthenticated()){
        User.findById(req.user.id, (err, foundUser) =>{
            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    const codename = foundUser.codename;
                    const tlsid = foundUser.TLS_ID;
                    let rank = "";

                    //Rank
                    if(tlsid == 1){
                        rank = "Leader";
                    }else if(tlsid == 2){
                        rank = "Co-Leader";
                    }else if(tlsid > 2 && tlsid < 10){
                        rank = "ELite";
                    }else {
                        rank = "Member";
                    }

                    res.render("hq", {_codename: codename, _rank: rank , _TLS_ID: tlsid});
                }
            }
        });
    } else {
        res.status(404).send('Bad Request: Not Found');
    }
}

const Register = (req, res) => {
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.locals.render("register");
        } else {
            //TLS_ID save
            const tls_ID = generateTLSID.generate();
            user.TLS_ID = tls_ID;
            const codename = req.body.username;
            user.codename = codename;
            user.save();

            //INFO
            __codename = user.username;

            passport.authenticate("local")(req, res, function(){
                res.redirect("/hq");
            });
        }
    });
}

const Login = (req, res) => {
    const user = new User({
        TLS_ID: req.body.tlsid,
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                //INFO
                __codename = user.username;
                
                res.redirect("/hq");
            });
        }
    });
}

const Logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

const Rooms = {
    Get: (req, res) => {
        //if (req.isAuthenticated()){
        //res.sendFile(`${rootDir}/room.html`);
        res.render("rooms");
        //} else {
        //  res.status(404).send('Bad Request: Not Found');
        //}
    }
}

module.exports = {Homepage, HomepageContact, HQ, Register, Login, Logout, Rooms, __codename};