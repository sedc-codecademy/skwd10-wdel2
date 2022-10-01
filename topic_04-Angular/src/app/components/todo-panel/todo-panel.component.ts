import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.css'],
})
export class TodoPanelComponent
  implements
    OnInit,
    DoCheck,
    OnDestroy,
    OnChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  clickMeButtonDisabled: boolean = true;
  currentDisplayTodo: Todo;
  randomClass: string = 'random';
  todos: Todo[] = [];

  /*
  [Component Hooks]
  - constructor
  - OnInit
  - DoCheck
  - OnDestroy
  - OnChanges

  [Component Children Hooks]
  - AfterContentInit
  - AfterContentChecked
  - AfterViewInit
  - AfterViewChecked
  */

  /* Called in the bootstrapping phase
  This phase is when Angular creates the instances of services, pipes, components, and directives 
  in our module. Angular initializes the component and resolves 
  its dependencies and passes it to the constructor.
  */
  constructor(private todoService: TodoService) {
    console.log('Constructor invoked!');
  }

  /*
  Is a lifecycle hook called after Angular has initialized all data.
  Called in the change detection phase.
  is called after the component tree has been constructed, 
  and the dependencies are resolved and passed to the component/directive’s instances.
  */
  ngOnInit(): void {
    this.todoService
      .getAllTodos()
      .then((response) => response.json())
      .then((result) => {
        this.todos = result;
      });
  }

  /*
  OnDestroy is lifecycle hook that is called when a directive, pipe, or service is destroyed. 
  Use this for any custom cleanup that needs to occur when the instance is destroyed.
  */
  ngOnDestroy(): void {
    console.log('OnDestroy invoked');
  }

  /* DoCheck is a callback method that performs change detection, 
  invoked after the default change detector runs.
  This hook comes after the OnInit hook. 
  DoCheck is not run on an event like OnInit and OnChanges, 
  which are called when a change in input properties occurs or when the component/directive is 
  initialized. Instead, 
  this hook is added so the developer can add his or her custom code to perform a custom CD.
  */
  ngDoCheck(): void {
    console.log('DoCheck invoked!');
  }

  // Called after a bound property changes
  // Very simply, ngOnChanges is run when the component/directive’s input bindings have changed.
  // It's also the first hook to run
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges invoked', changes);
  }

  /*
  AfterContentInit is called when the content of a component/directive has initialized.
  */
  ngAfterContentInit(): void {
    console.log('AfterContentInit invoked!');
  }

  /*
  This hook is called after the default change detector for the 
  component/directive projected into a component via the ng-content tag has completed its check
  */
  ngAfterContentChecked(): void {
    console.log('AfterContentChecked invoked!');
  }

  /*
  This hook is called after a component’s view and its children’s views 
  have been created and fully initialized.
  This hook comes in handy when we want to reference a 
  component/directive instance in our component using ViewChild/ViewChildren.
  */
  ngAfterViewInit(): void {
    console.log('AfterViewInit invoked!');
  }

  /*
  This hook is called after the change detector of a component/directive’s child component 
  has been run for checks.
  Be careful not to set any variables bound to the template here. 
  If you do, you’ll receive the "Expression has changed after it was checked" error.
  */

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked invoked');
  }

  displayTodoEvent(todo: Todo) {
    this.currentDisplayTodo = todo;
  }
}
