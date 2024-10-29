const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

// Server port
const HTTP_PORT = 3333;

// Logging
app.use(morgan("tiny"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ status: "Alive" });
});

// Other API endpoints: Links go here...
// You can uncomment the below four lines as you implement the functionality - we'll discuss this structure in week three.
require("./app/routes/user.server.route.js")(app);
require("./app/routes/event.server.route.js")(app);
require("./app/routes/question.server.route.js")(app);

// Default response for any other request
app.use((req, res) => {
  res.sendStatus(404);
});

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port: " + HTTP_PORT);
});
