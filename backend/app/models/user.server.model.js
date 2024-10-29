// this file will contain the functions to handle the requests from the user routes
const db = require("../../database.js");
const crypto = require("crypto");

const getHash = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
};

const setToken = (id, done) => {
  const token = crypto.randomBytes(64).toString("hex");

  const sql = "UPDATE users SET session_token = ? WHERE user_id = ?";

  db.run(sql, [token, id], function (err) {
    return done(err, token);
  });
};

const create_user = (user, done) => {
  const salt = crypto.randomBytes(64);
  const hash = getHash(user.password, salt);

  const sql =
    "INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)";
  const values = [
    user.first_name,
    user.last_name,
    user.email,
    hash,
    salt.toString("hex"),
  ];

  db.run(sql, values, function (err) {
    if (err) {
      return done(err);
    }

    return done(null, {
      user_id: this.lastID,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  });
};

const login_user = (email, password, done) => {
  const sql = "SELECT user_id, password, salt FROM users WHERE email = ?";

  db.get(sql, [email], (err, row) => {
    if (err) {
      return done(err);
    }

    const salt = row.salt ? Buffer.from(row.salt, "hex") : Buffer.alloc(0);

    if (row.password !== getHash(password, salt)) {
      return done(null, false);
    } else {
      return done(null, row.user_id);
    }
  });
};

const logout_user = (req, res) => {};

module.exports = {
  create_user,
  login_user,
  logout_user,
  setToken,
};
