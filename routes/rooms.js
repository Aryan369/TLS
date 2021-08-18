const app = require("express");

const router = app.Router();

router.get("/", (req, res) =>{
    //if (req.isAuthenticated()){
    res.sendFile(`${__dirname}/room.html`);
    //} else {
    //  res.status(404).send('Bad Request: Not Found');
    //}
})

module.exports = router;