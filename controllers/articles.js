const Article = require("../models/articles");

const getArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid Data" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = { getArticles, createArticle };
