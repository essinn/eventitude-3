/**
 * this file will contain the validation schema for the question routes
 */
const Joi = require("joi");
const question = require("../models/question.server.model.js");

const askQuestion = (req, res) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    asked_by: Joi.number().required(),
    event_id: Joi.number().required(),
    votes: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  question.insert(req.body, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error posting question: " + err.message });
    }

    return res
      .status(201)
      .json({ message: "Posted question successfully", row });
  });
};

const deleteQuestion = (req, res) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  question.delete_question(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error deleteing question: " + err.message });
    }

    return res
      .status(200)
      .json({ message: "Deleted question successfully", row });
  });
};

const vote = (req, res) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  question.update_vote(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error voting question: " + err.message });
    }

    return res
      .status(200)
      .json({ message: "Question voted successfully", row });
  });
};

const unvote = (req, res) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  question.update_vote(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error unvoting question: " + err.message });
    }

    return res
      .status(200)
      .json({ message: "Question unvoted successfully", row });
  });
};

module.exports = {
  askQuestion,
  deleteQuestion,
  vote,
  unvote,
};
