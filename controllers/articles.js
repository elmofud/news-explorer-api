const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const Article = require("../models/articles");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id } = req.user;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError("Article not Found");
    })
    .then((article) => {
      if (article.owner.toString() !== _id.toString()) {
        throw new ForbiddenError("Forbidden");
      }
      return Article.findByIdAndDelete(articleId);
    })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id"));
      } else {
        next(err);
      }
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
