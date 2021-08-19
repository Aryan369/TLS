const app = require("express");
const controller = require("../controllers/controller");

const router = app.Router();

router.get("/", controller.Homepage.Get);

router.post("/homepage", controller.Homepage.Post);

module.exports = router;