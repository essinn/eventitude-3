// the endpoints to the event controller
const events = require("../controllers/event.server.controller.js");

module.exports = function (app) {
  app.route("/events").post(events.createEvent);
  app
    .route("/event/:event_id")
    .get(events.eventById)
    .patch(events.updateEvent)
    .post(events.attendee)
    .delete(events.deleteEvent);
  app.route("/search").get(events.search);
};
