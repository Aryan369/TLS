const app = require("express");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const generateTLSID = require("../generateTLS_ID");


const router = app.Router();

router.post("/", function(req, res){

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
            client_codename = user.codename;

            passport.authenticate("local")(req, res, function(){
                res.redirect("/hq");
            });
        }
    });

});

module.exports = router;