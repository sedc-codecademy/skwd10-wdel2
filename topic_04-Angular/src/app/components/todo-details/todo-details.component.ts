import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  @Input() todoToDisplay: Todo;
  @ViewChild('updateInput') public updateInput: ElementRef;
  basePrice = 39.99;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  calculateRem(remValue: number) {
    return `${remValue}rem`;
  }

  // What the pipe actually does
  convertToCurrency(price: number, currency: string) {
    if (currency === 'EUR') {
      return `€${price}`;
    } else if (currency === 'USD') {
      return `$${price}`;
    } else {
      return `$${price}`;
    }
  }

  onUpdateProgress() {
    const newProgress = this.updateInput.nativeElement.value;
    const todoId = this.todoToDisplay._id;
    this.todoService.updateTodoProgress(newProgress, todoId);
  }

  // Translation Pipe Library
  // https://github.com/ngx-translate/core
}
