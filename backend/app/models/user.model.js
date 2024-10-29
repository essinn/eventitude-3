// this file will contain the functions to handle the requests from the user routes
const db = require("../../database.js");

const create_user = (name, err) => {
  const sql =
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

  db.run(sql, [first_name, last_name, email, password], (err, row) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    res.status(201).send("user created sucessfully", row);
  });
};

const login_user = (name, err) => {
  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

  db.run(sql, [email, password], (err, row) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    res.status(200).send("user logged in successfully", row);
  });
};

const logout_user = (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
};
