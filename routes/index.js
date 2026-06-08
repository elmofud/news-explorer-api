const router = require("express").Router();
const articleRouter = require("./articles");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);

router.use("/articles", articleRouter);

module.exports = router;
