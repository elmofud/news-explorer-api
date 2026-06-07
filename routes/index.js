const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/", userRouter);

router.use("/users", userRouter);

module.exports = router;
