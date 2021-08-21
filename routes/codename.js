const app = require("express");
const controller = require("../controllers/controller");

const router = app.Router();

router.get("/", controller.getCodename);

module.exports = router;