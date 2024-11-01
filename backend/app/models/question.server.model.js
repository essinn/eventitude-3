/**
 * this file will contain the functions to handle the requests from the question routes
 * the functions will interact with the sqlite database and return the results to the controller
 */
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

const update_vote = (question, done) => {
  const sql = "UPDATE questions SET votes = votes + 1 WHERE question_id = ?";

  db.run(sql, [question.question_id], (err, row) => {
    if (err) {
      done(err);
    }

    done(null, row);
  });
};

const update_unvote = (question, done) => {
  const sql = "UPDATE questions SET votes = votes - 1 WHERE question_id = ?";

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
  update_vote,
  update_unvote,
};
