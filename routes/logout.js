const app = require("express");
const controller = require("../controllers/controller");

const router = app.Router();

router.get("/", controller.Logout);

module.exports = router;