const Article = require("../models/articles");

const getArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getArticles };
