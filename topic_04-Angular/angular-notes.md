# Angular Notes

## Components

Components are the main building block for Angular applications. Each component consists of:

- An HTML template that declares what renders on the page
- A Typescript class that defines behavior
- A CSS selector that defines how the component is used in a template
- Optionally, CSS styles applied to the template

Every component is a class with a @Component decorator.
The base syntax should look like this:

```
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.css']
})

export class ComponentOverviewComponent {

}
```

To create a component you can use the CLI command ng generate component path/name-of-component.

## Data Binding

### Property Binding

Property binding in Angular helps you set values for properties of HTML elements or directives.

Use property binding to do things such as toggle button functionality, set paths programmatically, and share values between components.

Property binding moves a value in one direction, from a component's property into a target element property.

To bind to an element's property, enclose it in square brackets, [], which identifies the property as a target property.

A target property is the DOM property to which you want to assign a value.

For example, the target property in the following code is the image element's src property.

```
<img [src]="itemImageUrl">
```

In most cases, the target name is the name of a property, even when it appears to be the name of an attribute.

In this example, src is the name of the <img> element property.

The brackets, [], cause Angular to evaluate the right-hand side of the assignment as a dynamic expression.

Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.

```
<app-item-detail childItem="parentItem"></app-item-detail>
```

To use the target and the property, you must declare them in their respective classes.

Declare the target of childItem in its component class, in this case ItemDetailComponent.

For example, the following code declares the target of childItem in its component class, in this case ItemDetailComponent.

Then, the code contains an @Input() decorator with the childItem property so data can flow into it.

```
@Input() childItem = '';
```

### Event Binding

Event binding lets you listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches.

To bind to an event you use the Angular event binding syntax.
This syntax consists of a target event name within parentheses to the left of an equal sign, and a quoted template statement to the right.
In the following example, the target event name is click and the template statement is onSave().

```
<button (click)="onSave()">Save</button>
```

You can also create your own events in a child component with EventEmitter, which you can listen to from the parent component.

You declare such an EventEmitter with the @Output decorator.

#### Child Component

```
@Output() deleteRequest = new EventEmitter<Item>();

delete() {
  this.deleteRequest.emit(this.item);
}
```

#### Child Template

```
<img src="{{itemImageUrl}}" [style.display]="displayNone">
<span [style.text-decoration]="lineThrough">{{ item.name }}
</span>
<button (click)="delete()">Delete</button>
```

#### Parent Component

```
deleteItem(item) {
  // do stuff with item
}
```

#### Parent Template

```
<app-item-detail (deleteRequest)="deleteItem($event)" [item]="currentItem"></app-item-detail>
```

### Two Way Data Binding

Two-way binding gives components in your application a way to share data.

Use two-way binding to listen for events and update values simultaneously between parent and child components.

Two-way binding combines property binding with event binding:

- Property binding sets a specific element property.
- Event binding listens for an element change event.

Angular's two-way binding syntax is a combination of square brackets and parentheses, [()].

The [()] syntax combines the brackets of property binding, [], with the parentheses of event binding, (), as follows.

There’s one directive in Angular >= 2.x that implements two-way data binding: ngModel.

```
<input [(ngModel)]="username">
<p>Hello {{username}}!</p>
```

If we take a look at the source code, we’ll notice that ngModel actually comes with a property and event binding as well.

The property binding part of [ngModel] takes care of updating the underlying input DOM element.

The event binding part of (ngModel) takes care of catching the (ngModelChange) event and notifies the outside world when there was a change in the DOM.

To further understand this, we can divide ngModel into two parts.

```
<input [ngModel]="username" (ngModelChange)="username = $event">

<p>Hello {{username}}!</p>
```

$event is the payload of the emitted event.
In other words, ngModelChange takes care of extracting target.value from the inner $event payload, and simply emits that

Last but not least, since writing username and ngModel twice is still too much, Angular allows the shorthand syntax using [()].

## Lifecycle Hooks

A component instance has a lifecycle that starts when Angular instantiates the component class and renders the component view along with its child views.

The lifecycle continues with change detection, as Angular checks to see when data-bound properties change, and updates both the view and the component instance as needed.

The lifecycle ends when Angular destroys the component instance and removes its rendered template from the DOM.

Directives have a similar lifecycle, as Angular creates, updates, and destroys instances in the course of execution.

#### Component Hooks:

- constructor()
- OnInit
- DoCheck
- OnChanges
- OnDestroy

#### Component's children's hooks

- AfterContentInit
- AfterContentChecked
- AfterViewInit
- AfterViewChecked

#### Constructor

Called in the bootstrapping phase/

This phase is when Angular creates the instances of services, pipes, components, and directives in our module.

Angular initializes the component and resolves its dependencies and passes it to the constructor.

#### ngOnInit

Is a lifecycle hook called after Angular has initialized all data.

Called in the change detection phase.

is called after the component tree has been constructed,

and the dependencies are resolved and passed to the component/directive’s instances.

#### ngDoCheck

DoCheck is a callback method that performs change detection, invoked after the default change detector runs.

This hook comes after the OnInit hook.

DoCheck is not run on an event like OnInit and OnChanges,

which are called when a change in input properties occurs or when the component/directive is initialized.

Instead, this hook is added so the developer can add his or her custom code to perform a custom CD.

#### ngOnChanges

Called after a bound property changes

Very simply, ngOnChanges is run when the component/directive’s input bindings have changed.

#### ngOnDestroy

OnDestroy is lifecycle hook that is called when a directive, pipe, or service is destroyed.

Use this for any custom cleanup that needs to occur when the instance is destroyed.

#### AfterContentInit

AfterContentInit is called when the content of a component/directive has initialized.

#### AfterContentChecked

This is hook is called after the default change detector for the

component/directive projected into a component via the ng-content tag has completed its check

#### AfterViewInit

This hook is called after a component’s view and its children’s views have been created and fully initialized.

This hook comes in handy when we want to reference a component/directive instance in our component using ViewChild/ViewChildren.

#### AfterViewChecked

This hook is called after the change detector of a component/directive’s child component has been run for checks.

Be careful not to set any variables bound to the template here.

If you do, you’ll receive the "Expression has changed after it was checked" error.

## Directives

### Structural Directives

#### \*ngFor

A structural directive that renders a template for each item in a collection.

The directive is placed on an element, which becomes the parent of the cloned templates.

Angular also provides access to the elements in that collection/array, within the template.

```
<li *ngFor="let item of items; index as i; trackBy: trackByFn">
  <app-item-card [currentItem]="item"></app-item-card>
</li>
```

#### \*ngIf

A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean.

When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null,

Angular renders the template provided in an optional else clause.

The default template for the else clause is blank.

```
<div *ngIf="condition">Content to render when condition is true.</div>
```

### Attribute Directives

#### [ngClass]

Adds and removes CSS classes on an HTML element.

In this example, the class active will only be added if the condition is true.

```
[ngClass]="{'active': card.currentStatus.id === template.id}"
```

#### [ngStyle]

An attribute directive that updates styles for the containing HTML element.

Sets one or more style properties, specified as colon-separated key-value pairs.

```
[ngStyle]="{'width': progress + '%'}"
```

## Pipes

Use pipes to transform strings, currency amounts, dates, and other data for display.

Pipes are simple functions to use in template expressions to accept an input value and return a transformed value.

Pipes are useful because you can use them throughout your application, while only declaring each pipe once.

### Most common premade pipes

- DatePipe: Formats a date value according to locale rules.
- UpperCasePipe: Transforms text to all upper case.
- LowerCasePipe: Transforms text to all lower case.
- CurrencyPipe: Transforms a number to a currency string, formatted according to locale rules.
- DecimalPipe: Transforms a number into a string with a decimal point, formatted according to locale rules.
- PercentPipe: Transforms a number to a percentage string, formatted according to locale rules.

#### Examples

```
<p>The hero's birthday is {{ birthday | date }}</p>
```

Pipes can take in input parameters. For example this date pipe takes in a date format.

```
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
```

Pipes can also be chained

```
{{ birthday | date | uppercase}}
```

## Services & Dependency Injection

Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data.

They should focus on presenting data and delegate data access to a service.

Services are special classes using the singleton pattern.

This means that only one instance of that class will be created during the entire application lifetime,

and it will be used across the entire application.

The @Injectable() decorator specifies that Angular can use this class in the DI system.

The metadata, providedIn: 'root', means that the HeroService is visible throughout the application.

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```

Dependencies are services or objects that a class needs to perform its function.

Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.

To use this service in another service or a component, we inject it in that component's constructor like this

```
constructor(private heroService: HeroService) {  }
```

To create a service you can use the CLI, ng generate service path/name-of-service

## Routing

Routing in Angular is done via modules, and it utilizes the HttpClientModule.

First, you would need to generate a routing module with ng generate module path/routing-module-name

The module will be a class with the @ngModule decorator

Then, you need to create an array of routes, of the Routes type provided by angular.

Every route has a path and a component that will be rendered once that path is hit in the URL.

In the end you need to import the routing module, and export it alongside the routes.

Example:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import {HomeComponent} from 'src/app/components/HomeComponent/home.component.ts';

const routes: Routes = [
{
path: 'home',
component: HomeComponent
}

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The order of routes is important because the Router uses a first-match wins strategy when matching routes,

so more specific routes should be placed above less specific routes.

After you set up your routing module, you will need to import it in your main App.module.ts

In order to finally use the routing module, you need to place a <router-outlet></router-outlet> somewhere in your application.

The rendering of the routes will happen wherever you put this router outlet.

Because this is a vast topic, for further reading please refer to https://angular.io/guide/router

## Forms

### Template Driven Forms

Template-driven forms use two-way data binding to update the data model in the component as changes are made in the template and vice versa.

1. Build a basic form.
2. Bind form controls to data properties using the ngModel directive and two-way data binding syntax.
3. Track input validity and control status using ngModel.
4. Handle form submission using the ngSubmit output of the form.

Here's a simple example

```
<form (ngSubmit)="onFormSubmit()" #expenseForm="ngForm">
  <input type="text" ngModel name="expenseTitle" required #expenseTitle="ngModel"/>
  <input type="date" ngModel name="expenseDate" required #expenseDate="ngModel"/>
    <button type="submit" [disabled]="expenseForm.invalid"></button>
</form>
```

- In order to refer to it both in the template or in your component with @ViewChild, you need to give your form an alias like this #expenseForm="ngForm"
- In order to catch the submit, you can bind to the (ngSubmit event)
- Every input must have the ngModel directive on it, and also have a name
- You can further gain access to every control individually by giving every input an alias as well. #expenseTitle="ngModel"
- To use TD forms, you need to utilize the FormsModule, so you would need to import it in the module in whose components

you will be working with.

### Reactive Forms

Reactive forms provide a model-driven approach to handling form inputs whose values change over time.

Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time.

Each change to the form state returns a new state, which maintains the integrity of the model between changes.

Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

To use reactive forms, you need to utilize the ReactiveFormsModule, so you would need to import it in the module in whose components

you will be working with.

- In the typescript file, you need to create the FormGroup programatically.
- Every input in the form needs a FormControl parallel
- The first argument in the FormControl is the initial state of that input
- You can use the Validators class supplied by Angular to validate your forms

```
loginForm: FormGroup = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', )
})
```

```
<form [formGroup]="loginForm">
<input type="text" formControlName="username">
<input type="password" formControlName="password">
</form>
```

## HTTP Module

Most front-end applications need to communicate with a server over the HTTP protocol,

to download or upload data and access other back-end services.

Angular provides a client HTTP API for Angular applications, the HttpClient service class in @angular/common/http.

Before you can use HttpClient, you need to import the Angular HttpClientModule. Most apps do so in the root AppModule.

You can then inject the HttpClient service as a dependency of an application class, as shown in the following ConfigService example.

```
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}
```

Example of GET request:

```
  getAllTodos() {
    this.http
      .get(`${environment.baseUrl}/todos`)
      .pipe(map((todos) => todos as Todo[]))
      .subscribe(
        (payload: Todo[]) => {
          this.todosSubject$.next(payload);
        },
        (error) => {
          console.log(error);
        }
      );
  }
```

The idea here is that .get() returns a subscribable stream of data, kind of like subscribing to a newsletter or a youtube channel.

Every time that newsletter has a release, because you are already subscribed, you simply get notified along with the new data.

In this example we use .pipe() to be able to "pipe in" on the data stream before it gets outputted in our .subscribe()

This means that we can edit the data in any way we want, such as mapping it to a specific type.

To do a POST request, it would look like this

```
  createNewTodo(title: string, description: string, todoDate: string) {
    const newTodo: Todo = {
      progress: 0,
      title: title,
      description: description,
      date: todoDate,
    };
    // this.todos.push(newTodo);
    this.http.post(`${environment.baseUrl}/todos`, newTodo).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['todos']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
```

In this example, again we can see that the .post() method returns a so called Observable that we can subscribe to,

and listen to, so every time we invoke the .post() method, we can do something else as a response to it.

You will also notice that the .subscribe() method has at least two input parameters, that are callback functions.

The first one is executed on a sucessful HTTP response, while the second one on an HTTP error response.

## Feature Modules & Lazy Loading

Feature modules are NgModules for the purpose of organizing code.

As your application grows, you can organize code relevant for a specific feature.

This helps apply clear boundaries for features.

With feature modules, you can keep code related to a specific functionality or feature separate from other code.

Delineating areas of your application helps with collaboration between developers and teams,

separating directives, and managing the size of the root module.

A module might look like this

```
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerRoutingModule } from './customer-dashboard/customer-routing.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [CustomerRoutingModule],
})
export class CustomerModule { }
```

So, this module is a package containing the code for all of a feature's components, directives etc.

Eventually, ALL modules must be included in the main App.module.ts. You can either do this directly,

or you can rely on something called Lazy Loading

With regards to lazy loading, you will see that our example module imports a file named CustomerRoutingModule.

This will be a routing module, just like any other but now we can use lazy load our CustomerModule through routing

instead of directly in the main App.module.ts

So in some way, CustomerRoutingModule is a routing sub-module.

To lazy load CustomerModule (and its routing module) you need to use it in your main routing module, like this

```
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('../customer/customer.module').then((m) => m.CustomerModule),
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```
