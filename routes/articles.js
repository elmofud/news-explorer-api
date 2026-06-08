const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, createArticle);
router.delete("/:articleId", auth, deleteArticle);

module.exports = router;
