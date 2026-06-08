const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

router.use(auth);

router.get("/", getArticles);
router.post("/", createArticle);
router.delete("/:articleId", deleteArticle);

module.exports = router;
