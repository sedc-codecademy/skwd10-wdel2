import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

  }

  onSubmitTodo() {
    this.todoService.createNewTodo()
    .then((response) => response.json())
    .then((result) => console.log(result));
  }
}
