const app = require("express");

const router = app.Router();

router.get("/", function(req, res){
    //res.render("hq", {_codename: "dev", _rank: "dev" , _TLS_ID: "dev"});
    res.render("homepage");
});

router.post("/homepage", function(req, res){
    if(req.body.homepageInp == process.env.REGISTER_CODE){
        res.render("register");
    }else if(req.body.homepageInp == process.env.LOGIN_CODE){
        res.render("login");
    }else{
        res.redirect("https://google.com");
    }
});

module.exports = router;