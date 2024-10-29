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

  users.create_user(users, (err, row) => {
    if (err) {
      return res.status(400).send("Error creating user: ", err.message);
    }

    res.status(201).send("user created successfully", row);
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
};
const logout = (req, res) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
