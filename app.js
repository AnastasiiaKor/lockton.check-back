require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/api/admin");
const apiRouter = require("./routes/api/api");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/x", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
