import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './helpers/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './helpers/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async getAllTodos() {
    return await this.todoModel.find().exec();
  }

  async getTodoById(todoId: string) {
    return await this.todoModel.findById(todoId).exec();
  }

  async createNewTodo(todo: Todo) {
    try {
      const newTodo = this.todoModel.create(todo);
      return (await newTodo).save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateTodoProgress(todoId: string, newProgress: number) {
    try {
      return await this.todoModel
        .findOneAndUpdate(
          { _id: todoId },
          { progress: newProgress },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteTodo() {}
}
