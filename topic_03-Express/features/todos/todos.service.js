const Todo = require("./todos.model");
const mongoose = require("mongoose");

class TodosService {
  static async getAllTodos() {
    try {
      const todos = await Todo.find();
      return Promise.resolve(todos);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getTodoById(id) {
    try {
      const todoObject = await Todo.findById(id);
      if (!todoObject) {
        return Promise.reject({ message: "Todo does not exist." });
      }
      return Promise.resolve(todoObject);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async postNewTodo(todo) {
    try {
      const createdTodo = await new Todo(todo).save();
      return Promise.resolve(createdTodo);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateTodoProgress(id, newProgress) {
    try {
      const response = await Todo.findByIdAndUpdate(id, {
        $set: { progress: newProgress },
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteTodo(id) {
    const todoObjectId = new mongoose.Types.ObjectId(id);
    try {
      const response = await Todo.findByIdAndDelete(todoObjectId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = TodosService;
