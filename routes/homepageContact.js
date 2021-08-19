const express = require('express');
const controller = require("../controllers/controller");
const {Homepage} = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.HomepageContact);

module.exports = router;