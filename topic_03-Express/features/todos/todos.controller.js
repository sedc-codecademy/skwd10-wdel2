const TodosService = require("./todos.service");

class TodosController {
  static async getAllTodos(req, res) {
    try {
      const todosList = await TodosService.getAllTodos();
      res.status(200).json(todosList);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async getTodoById(req, res) {
    try {
      const todo = await TodosService.getTodoById(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async postNewTodo(req, res) {
    const newTodo = req.body;
    try {
      const response = await TodosService.postNewTodo(newTodo);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async updateTodoProgress(request, response) {
    const todoProgress = request.body.progress;
    const todoId = request.params.id;

    try {
      const response = await TodosService.updateTodoProgress(
        todoId,
        todoProgress
      );
      response.status(200).json(response);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}

module.exports = TodosController;
