require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/news_explorer_db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("News Explorer API is running");
});

app.use("/", indexRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
