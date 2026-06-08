const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getArticles, createArticle } = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, createArticle);

module.exports = router;
