/**
 * this file will contain the functions to handle the requests from the event routes
 */
const db = require("../../database.js");

// create a new event
const insert = (event, done) => {
  const sql =
    "INSERT INTO events (name, description, location, start_date, close_registration, max_attendees, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.run(
    sql,
    [
      event.name,
      event.description,
      event.location,
      event.start_date,
      event.close_registration,
      event.max_attendees,
      event.creator_id,
    ],
    (err, row) => {
      if (err) {
        done(err);
      }

      done(null, row);
    }
  );
};

const select = (event, done) => {
  const sql = "SELECT * FROM events WHERE event_id = ?";

  db.all(sql, [event.event_id], (err, row) => {
    if (err) {
      done(err);
    }

    done(null, row);
  });
};

const update = (event, done) => {
  const sql =
    "UPDATE events SET name = ?, description = ?, location = ?, start_date = ?, close_registration = ?, max_attendees = ?, creator_id = ? WHERE event_id = ?";

  db.run(
    sql,
    [
      event.name,
      event.description,
      event.location,
      event.start_date,
      event.close_registration,
      event.max_attendees,
      event.creator_id,
      event.event_id,
    ],
    (err, row) => {
      if (err) {
        done(err);
      }

      done(null, row);
    }
  );
};

module.exports = {
  insert,
  select,
  update,
};
