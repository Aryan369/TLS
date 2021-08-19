const app = require("express");
const controller = require("../controllers/controller");


const router = app.Router();

router.post("/", controller.Register);

module.exports = router;