const router = require("express").Router();
const {
  validateCreateArticle,
  validateArticleId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

router.use(auth);

router.get("/", getArticles);
router.post("/", validateCreateArticle, createArticle);
router.delete("/:articleId", validateArticleId, deleteArticle);

module.exports = router;
