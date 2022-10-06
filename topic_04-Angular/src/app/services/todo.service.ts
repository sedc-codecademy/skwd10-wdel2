import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // todos: Todo[] = [
  //   {
  //     _id: 1,
  //     title: 'Walk the dog',
  //     progress: 10.244556,
  //     description: 'Lorem ipsum dolor sit amet.',
  //     date: '2021-10-26',
  //     email: 'test@gmail.com',
  //   },
  //   {
  //     _id: 2,
  //     title: 'Title 2',
  //     progress: 30.34556213,
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a.',
  //     date: '2021-10-26',
  //     email: 'Ivan.Lazarevski@gmail.com',
  //   },
  //   {
  //     _id: 3,
  //     title: 'Title 3',
  //     progress: 75.34667,
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper et magna sit amet ornare.',
  //     date: '2021-10-26',
  //     email: 'heLLoWorLd@gmail.com',
  //   },
  //   {
  //     _id: 4,
  //     title: 'Title 4',
  //     progress: 100,
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a.',
  //     date: '2021-10-26',
  //     email: 'JustAnotherTest@gmail.com',
  //   },
  // ];
  constructor(private http: HttpClient, private router: Router) {}

  todosSubject$ = new Subject<Todo[]>();

  getAllTodos() {
    // return fetch(`${environment.baseUrl}/todos`);
    this.http
      .get(`${environment.baseUrl}/todos`)
      .pipe(map((todos) => todos as Todo[]))
      .subscribe({
        next: (payload: Todo[]) => this.todosSubject$.next(payload),
        error: (error) => console.log(error),
      });
  }

  createNewTodo(newTodo: Todo) {
    // return fetch(`${environment.baseUrl}/todos`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newTodo),
    // });
    this.http.post(`${environment.baseUrl}/todos`, newTodo).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
    });
  }

  deleteTodo(id: string | number | undefined) {
    if (id) {
      return fetch(`${environment.baseUrl}/todos/${id}`, {
        method: 'DELETE',
      });
    }
    return Promise.reject({ message: 'Id was not supplied!' });
  }

  updateTodoProgress(progressUpdate: string, id: string | number | undefined) {
    // if (!id) {
    //   return Promise.reject({ message: 'Id was not supplied!' });
    // }
    // return fetch(`${environment.baseUrl}/todos/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ progress: progressUpdate }),
    // });

    this.http
      .patch(`${environment.baseUrl}/todos/${id}`, {
        progress: parseInt(progressUpdate),
      })
      .subscribe({
        next: (value) => {
          this.getAllTodos();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
