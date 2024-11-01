// the endpoints to the event questions controller
const questions = require("../controllers/question.server.controller.js");

module.exports = function (app) {
  app.route("/event/:event_id/question").post(questions.askQuestion);
  app.route("/question/:question_id").delete(questions.deleteQuestion);
  app.route("/question/:question_id/vote").post(questions.vote);
  app.route("/question/:question_id/vote").delete(questions.unvote);
};
