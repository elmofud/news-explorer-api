const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getArticles } = require("../controllers/articles");

router.get("/", auth, getArticles);

module.exports = router;
