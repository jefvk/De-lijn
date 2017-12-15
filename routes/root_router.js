var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
  });
});

module.exports = root;
