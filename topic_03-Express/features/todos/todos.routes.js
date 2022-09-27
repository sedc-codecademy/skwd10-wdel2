const router = require("express").Router();
const TodosController = require("./todos.controller");

// http://localhost:3000/api/todos/
router.get("/", TodosController.getAllTodos);
router.get("/:id", TodosController.getTodoById);
router.post("/", TodosController.postNewTodo);
router.patch("/:id", TodosController.updateTodoProgress);

module.exports = router;