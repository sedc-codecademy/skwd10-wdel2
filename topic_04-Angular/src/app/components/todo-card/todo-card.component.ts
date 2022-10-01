import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  @Input() currentTodo: Todo; // Sends data from the parent to the child
  @Output() displayTodo = new EventEmitter<Todo>(); // Sends data from the child to the parent

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onDisplayTodo(todo: Todo) {
    this.displayTodo.emit(todo);
  }

  onDeleteTodo() {
    this.todoService
      .deleteTodo(this.currentTodo._id)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}
