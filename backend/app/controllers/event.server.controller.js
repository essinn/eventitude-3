/**
 * this file will contain the validation schema for the event routes
 */
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

const updateEvent = (req, res) => {
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

  event.update({ ...req.body, event_id: req.params.event_id }, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error updating event: " + err.message });
    }

    return res.status(200).json({ message: "Event updated successfully", row });
  });
};

const attendee = (req, res) => {
  const schema = Joi.object({
    event_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  event.attend(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error attending event: " + err.message });
    }

    return res
      .status(200)
      .json({ message: "Event attended successfully", row });
  });
};

const deleteEvent = (req, res) => {
  const schema = Joi.object({
    event_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  event.archive(req.params, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error deleting event: " + err.message });
    }

    return res.status(200).json({ message: "Event deleted successfully", row });
  });
};

const search = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.string().optional(),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  event.query(req.query, (err, row) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error searching events: " + err.message });
    }

    return res.status(200).json({ message: "search successful", row });
  });
};

module.exports = {
  createEvent,
  eventById,
  updateEvent,
  attendee,
  deleteEvent,
  search,
};
