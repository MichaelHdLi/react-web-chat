const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
	res.send("hello");
});

module.exports = app;
