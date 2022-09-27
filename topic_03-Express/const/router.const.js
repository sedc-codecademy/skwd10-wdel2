const router = require("express").Router();
const authRoutes = require("../features/auth/auth.routes");
const todosRoutes = require("../features/todos/todos.routes");

router.use("/auth", authRoutes);
router.use("/todos", todosRoutes);

module.exports = router;
