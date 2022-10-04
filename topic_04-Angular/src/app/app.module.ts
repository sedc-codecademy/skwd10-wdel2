import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoPanelComponent } from './components/todo-panel/todo-panel.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { TextareaAutosizeDirective } from './helpers/textarea-autosize.directive';
import { ShortenPipe } from './helpers/shorten.pipe';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoPanelComponent,
    TodoCardComponent,
    TodoDetailsComponent,
    NewTodoComponent,
    TextareaAutosizeDirective,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
