const app = require("express");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const router = app.Router();

router.post("/", function(req, res){

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
                client_codename = user.codename;

                res.redirect("/hq");
            });
        }
    });
});

module.exports = router;