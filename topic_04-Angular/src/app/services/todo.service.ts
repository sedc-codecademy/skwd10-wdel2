import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { environment } from 'src/environments/environment';

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
  constructor() {}

  getAllTodos() {
    return fetch(`${environment.baseUrl}/todos`);
  }

  createNewTodo(newTodo: Todo) {
    return fetch(`${environment.baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
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
    if (!id) {
      return Promise.reject({ message: 'Id was not supplied!' });
    }
    return fetch(`${environment.baseUrl}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ progress: progressUpdate }),
    });
  }
}
