const router = require("express").Router();
const TodosController = require("./todos.controller");

const tokenValidator = require("../../middleware/token-validator.middleware");

router.use(tokenValidator);

router.get("/", TodosController.getAllTodos);
router.get("/:id", TodosController.getTodoById);
router.post("", TodosController.postNewTodo);
router.patch("/:id", TodosController.updateTodoProgress);
router.delete("/:id", TodosController.deleteTodo);

module.exports = router;