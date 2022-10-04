import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTodoComponent } from 'src/app/components/new-todo/new-todo.component';
import { TodoPanelComponent } from 'src/app/components/todo-panel/todo-panel.component';

const routes: Routes = [
  // http://localhost:4000/new
  {
    path: 'new',
    component: NewTodoComponent,
    title: 'New Todo Page',
  },
  // http://localhost:4000/todos
  { path: 'todos', component: TodoPanelComponent, title: 'Todo Panel Page' },

  // http://localhost:4200/auth
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth.module').then((module) => module.AuthModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
