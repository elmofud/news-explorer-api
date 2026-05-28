const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://127.0.0.1:27017/news_explorer_db");

app.get("/", (req, res) => {
  res.send("News Explorer API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
