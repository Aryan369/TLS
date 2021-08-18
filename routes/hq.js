const app = require("express");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const router = app.Router();

router.get("/hq", function(req, res){
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
});

module.exports = router;