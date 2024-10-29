// the endpoints to the event controller
require("express");
const {
  createEvent,
  eventById,
  updateEvent,
  attendee,
  deleteEvent,
  search,
} = require("../controllers/event.controller.js");

module.exports = function (app) {
  app.route("/events").post(createEvent);
  app.route("/events/:event_id").get(eventById);
  app.route("/events/:event_id").patch(updateEvent);
  app.route("/events/:event_id").patch(attendee);
  app.route("/events/:event_id").delete(deleteEvent);
  app.route("/search").get(search);
};
