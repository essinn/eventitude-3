// the endpoints to the event controller
const express = require("express");
const {
  createEvent,
  eventById,
  updateEvent,
  attendee,
  deleteEvent,
} = require("../controllers/event.controller.js");
const router = express.Router();

router.post("/events", createEvent);
router.get("/events/:event_id", eventById);
router.patch("/events/:event_id", updateEvent);
router.post("/events/:event_id", attendee);
router.delete("/events/:event_id", deleteEvent);
router.get("/search");

module.exports = router;
