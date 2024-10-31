// this file will contain the validation schema for the event routes
const Joi = require("joi");
const event = require("../models/event.server.model");

const createEvent = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().required(),
    close_registration: Joi.date().required(),
    max_attendees: Joi.number().required(),
    creator_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  event.insert(req.body, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error creating event: " + err.message });
    }

    return res.status(201).send({ message: "Event created successfully", row });
  });
};

const eventById = (req, res) => {
  const schema = Joi.object({
    event_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  event.select(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error getting events: " + err.message });
    }

    return res.status(200).json({ message: "Got events successfully", row });
  });
};

const updateEvent = (req, res) => {};

const attendee = (req, res) => {};
const deleteEvent = (req, res) => {};
const search = (req, res) => {};

module.exports = {
  createEvent,
  eventById,
  updateEvent,
  attendee,
  deleteEvent,
  search,
};
