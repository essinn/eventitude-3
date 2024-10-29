// the endpoints to the user controller
const express = require("express");
const {
  login,
  signup,
  logout,
} = require("../controllers/user.server.controller.js");

module.exports = function (app) {
  app.route("/users").post(signup);
  app.route("/login").post(login);
  app.route("/logout").post(logout);
};
