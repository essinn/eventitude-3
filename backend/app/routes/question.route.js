// the endpoints to the event questions controller
const express = require("express");
const {
  askQuestion,
  deleteQuestion,
  vote,
  unvote,
} = require("../controllers/question.controller.js");
const router = express.Router();

router.post("/event/:event_id/question", askQuestion);
router.delete("/question/:question_id", deleteQuestion);
router.post("/question/:question_id/vote", vote);
router.delete("/question/:question_id/vote", unvote);

module.exports = router;
