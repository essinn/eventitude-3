// the endpoints to the event questions controller
const questions = require("../controllers/question.server.controller.js");
const authenticated = require("../lib/middleware.js");

module.exports = function (app) {
  app
    .route("/event/:event_id/question")
    .post(authenticated, questions.askQuestion);
  app
    .route("/question/:question_id")
    .delete(authenticated, questions.deleteQuestion);
  app.route("/question/:question_id/vote").post(authenticated, questions.vote);
  app
    .route("/question/:question_id/vote")
    .delete(authenticated, questions.unvote);
};
