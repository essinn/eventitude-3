// the endpoints to the user controller
const express = require("express");
const { login, signup, logout } = require("../controllers/user.controller.js");
const router = express.Router();

router.post("/users", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
