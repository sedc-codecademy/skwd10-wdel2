import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})
export class NewTodoComponent implements OnInit {
  todoForm: FormGroup;
  maxDescriptionLength: number = 64;
  blockedTitles: string[] = ['Bad', 'Title', 'Ivan'];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.todoForm = new FormGroup({
      todoTitle: new FormControl('', [
        Validators.required,
        this.blockedNamesValidation,
      ]),
      todoDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.maxDescriptionLength),
      ]),
      todoDate: new FormControl('', Validators.required),
    });
  }

  onSubmitTodo() {
    const { todoTitle, todoDescription, todoDate } = this.todoForm.value;
    const newTodo: Todo = {
      title: todoTitle,
      description: todoDescription,
      date: todoDate,
      progress: 0,
    };

    this.todoService.createNewTodo(newTodo);
  }

  blockedNamesValidation = (
    control: FormControl
  ): { [key: string]: boolean } | null => {
    // Dont worry about the return type. Just return either an object or a null.
    if (this.blockedTitles.includes(control.value)) {
      // Name of the error is of your choice.
      return { wordIsForbidden: true };
    }
    return null;
  };
}
