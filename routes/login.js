const app = require("express");
const controller = require("../controllers/controller");

const router = app.Router();

router.post("/", controller.Login);

module.exports = router;