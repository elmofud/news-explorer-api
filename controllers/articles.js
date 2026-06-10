const Article = require("../models/articles");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
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

const deleteArticle = (req, res) => {
  const { articleId } = req.params;
  const { _id } = req.user;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => {
      const error = new Error("Article not found");
      error.statusCode = 404;
      throw error;
    })
    .then((article) => {
      if (article.owner.toString() !== _id.toString()) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        throw error;
      }
      return Article.findByIdAndDelete(articleId);
    })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid Id" });
      }
      if (err.statusCode) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
