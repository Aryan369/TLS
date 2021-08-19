const app = require("express");
const controller = require("../controllers/controller");

const router = app.Router();

router.get("/", controller.HQ);

module.exports = router;