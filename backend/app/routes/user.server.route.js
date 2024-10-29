// the endpoints to the user controller
const users = require("../controllers/user.server.controller.js");

module.exports = function (app) {
  app.route("/users").post(users.signup);
  app.route("/login").post(users.login);
  app.route("/logout").post(users.logout);
};
