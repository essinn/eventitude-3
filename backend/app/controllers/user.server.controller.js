// this file will contain the validation schema for the user routes
const Joi = require("joi");
const users = require("../models/user.server.model.js");

const signup = (req, res) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  users.create_user(req.body, (err, row) => {
    if (err) {
      return res.status(400).send("Error creating user: " + err.message);
    }

    res.status(201).send("user created successfully" + row.user_id);
  });
};

const login = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  users.login_user(req.body.email, req.body.password, (err, row) => {
    if (err) {
      return res.status(400).send("Error logging in: " + err.message);
    }

    users.setToken(row, (err, token) => {
      if (err) {
        return res.status(400).send("Error logging in: " + err.message);
      }

      return res.status(200).send({
        message: "User logged in successfully",
        user_id: row,
        session_token: token,
      });
    });
  });
};

const logout = (req, res) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const token = req.get("X-Authorization");

  users.logout_user(token, err => {
    if (err) {
      return res.status(400).send("Error logging out: " + err.message);
    }

    return res.status(200).send("User logged out successfully");
  });
};

module.exports = {
  signup,
  login,
  logout,
};
