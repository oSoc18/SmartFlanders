const express = require("express");
const app = express();
const body = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const pug = require("pug");

// --- Middlewere
app.use(body.json());
app.use(morgan("dev"));
app.use(cors())

app.use(express.static("public"));
app.get("/schema.json") {
  res.sendFile(__dirname + "/files/schema.json");
}
app.get("/graph", (req, res) => {
  res.sendFile(__dirname + "/files/master-catalog.json");
})
app.use("/graph", express.static('files'));
app.get("/", (req, res) => {
  res.render("index");
})
// --- Routes
app.use("/", routes)

// --- Enable PUG template
app.set("views", path.join(__dirname, 'templates'));
app.set("view engine", 'pug');

//
app.use(function(err, req, res, next) {
    if(!err.message) err.message = "General error"
    res.status(500).send({status:500, message: err.message, type:"internal"});
  })

  /**
 * Server listener
 * @param {number} - Port number
 */
app.listen(3001, () => console.log("SmartFlanders is running on port 3001"))
