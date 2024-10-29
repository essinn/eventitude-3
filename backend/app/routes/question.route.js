// the endpoints to the event questions controller
require("express");
const {
  askQuestion,
  deleteQuestion,
  vote,
  unvote,
} = require("../controllers/question.controller.js");

module.exports = function (app) {
  app.route("/event/event:id/question").post(askQuestion);
  app.route("/question/:question_id").delete(deleteQuestion);
  app.route("/question/:question_id/vote").post(vote);
  app.route("/question/:question_id/vote").delete(unvote);
};
