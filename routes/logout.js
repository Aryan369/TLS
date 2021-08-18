const app = require("express");

const router = app.Router();

router.get("/", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;