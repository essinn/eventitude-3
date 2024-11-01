// this file will contain the functions to handle the requests from the question routes

const db = require("../../database.js");

// ask a question
const insert = (question, done) => {
  const sql =
    "INSERT INTO questions (question, asked_by, event_id, votes) VALUES (?, ?, ?, ?)";

  db.run(
    sql,
    [question.question, question.asked_by, question.event_id, question.votes],
    (err, row) => {
      if (err) {
        done(err);
      }

      done(null, row);
    }
  );
};

const delete_question = (question, done) => {
  const sql = "DELETE FROM questions WHERE question_id = ?";

  db.run(sql, [question.question_id], (err, row) => {
    if (err) {
      done(err);
    }

    done(null, row);
  });
};

module.exports = {
  insert,
  delete_question,
  // update_vote,
  // update_unvote,
};
