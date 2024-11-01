// the endpoints to the event controller
const events = require("../controllers/event.server.controller.js");
const authenticated = require("../lib/middleware.js");

module.exports = function (app) {
  app.route("/events").post(authenticated, events.createEvent);
  app
    .route("/event/:event_id")
    .get(authenticated, events.eventById)
    .patch(authenticated, events.updateEvent)
    .post(authenticated, events.attendee)
    .delete(authenticated, events.deleteEvent);
  app.route("/search").get(events.search);
};
