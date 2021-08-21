const express = require("express");
const _codename = require("./app");

const app = express();

app.post("/", (req, res) => {
    res.send(_codename);
});