import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './helpers/create-todo.dto';
import { Todo } from './helpers/todo.schema';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/middleware/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/')
  async fetchAllTodo() {
    return await this.todosService.getAllTodos();
  }

  // http://localhost:3000/todos/1
  @Get('/:id')
  async fetchTodoById(@Param('id') todoId: string) {
    return await this.todosService.getTodoById(todoId);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async postNewTodo(@Body() body: CreateTodoDto) {
    const newTodo: Todo = {
      title: body.title,
      date: body.date,
      progress: parseFloat(body.progress),
      description: body.description,
    };
    return await this.todosService.createNewTodo(newTodo);
  }
}
