const router = require("express").Router();
const articleRouter = require("./articles");
const { createUser, login } = require("../controllers/users");
const { validateSignup, validateSignin } = require("../middlewares/validation");
const userRouter = require("./users");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use("/users", userRouter);

router.use("/articles", articleRouter);

module.exports = router;
