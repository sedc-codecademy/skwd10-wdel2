import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  @Input() todoToDisplay: Todo;
  basePrice = 39.99;

  constructor() {}

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

  // Translation Pipe Library
  // https://github.com/ngx-translate/core
}
