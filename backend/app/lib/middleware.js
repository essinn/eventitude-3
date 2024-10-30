/**
 * middleware for authenticated users
 * checks if user is authenticated and has a valid session token
 */
const users = require("../models/user.server.model.js");

const authenticated = (req, res, next) => {
  const token = req.get("X-Authorization");

  users.getTokenId(token, (err, user_id) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user_id = user_id;
    next();
  });
};

module.exports = authenticated;
