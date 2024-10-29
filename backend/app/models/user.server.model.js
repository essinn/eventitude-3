// this file will contain the functions to handle the requests from the user routes
const db = require("../../database.js");

const getHash = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
};

const create_user = (user, done) => {
  const salt = crypto.randomBytes(64);
  const hash = getHash(user.password, salt);

  const sql =
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  const values = [
    user.first_name,
    user.last_name,
    user.email,
    hash,
    salt.toString("hex"),
  ];

  db.run(sql, values, (err, row) => {
    if (err) {
      return done(err);
    }

    return done(row);
  });
};

const login_user = (email, password, done) => {
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
  create_user,
  login_user,
  logout_user,
};
