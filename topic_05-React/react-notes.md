## Getting Started

### Boilerplate project commands

- npx create-react-app my-app
Use this command to create a boilerplate application. Replace my-app with the name of your app

- npm start
Start the app with this command. It boots the app on localhost:3000 by default.

## JSX
```
const element = <h1>Hello, world!</h1>;
```

JSX is a fusion of HTML and Javascript. It lets you write dynamic HTML while also having access to Javascript logic
in the same file. It's recommended using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

### You can put any valid JavaScript expression inside the curly braces in JSX.
```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

### JSX as a valid expression
After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.
This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions.

### Cross Site Script protection
By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

## Components
Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. 
Components are JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

```
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
### Component props
Props are Read-Only. A component must never modify its own props.
Such functions are called “pure” because they do not attempt to change their inputs, and always return the same result for the same inputs.

## Handling Events
Handling events with React elements is very similar to handling events on DOM elements.
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
React defines these synthetic events according to the W3C spec, so you don’t need to worry about cross-browser compatibility. React events do not work exactly the same as native events.
When using React, you generally don’t need to call addEventListener to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

### Passing arguments with events
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```

## Conditional Rendering
In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.
Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.

### Inline conditional rendering
```
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
```

### Inline conditional rendering (ternary)
```
 return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
  ```

  ### Preventing rendering
  In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return null instead of its render output.

  ## Rendering Lists
  We can use the .map() array method to render lists.
  ```
  const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
### List keys
Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. Keys Must Only Be Unique Among Siblings

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

## Hooks
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

### State hook
```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
useState return an array of two elements. The first one is the state value itself (count), and the second is a function
used to update the state. The input param in useState() is the initial value of the state.

### Effect Hook
Data fetching, subscriptions, or manually changing the DOM from React components are actions called side-effects
because they can affect other components and can’t be done during rendering.
The Effect Hook, useEffect, adds the ability to perform side effects from a function component. 

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## React Router
React Router is a library for routing(navigating) between components in your React application.
- https://www.youtube.com/watch?v=Ul3y1LXxzdU
The best comprehensive tutorial on implementing routing (v6) in React

- https://www.youtube.com/watch?v=L2kzUg6IzxM
Another great course specifically on React Router v6


## Recommended Courses

### React & NextJS

- https://www.udemy.com/course/react-redux/
Modern react course. Very recommended.

- https://www.udemy.com/course/react-the-complete-guide-incl-redux/
Extensive React course. Covers basically everything.

- https://www.udemy.com/course/nextjs-react-the-complete-guide/
Level up your react skills. NextJS is an amazing framework for React. Absolutely recommended.

### NestJS
- https://www.udemy.com/course/nestjs-the-complete-developers-guide/
Great course for NestJS. Covers a lot of topics.

- https://www.udemy.com/course/nestjs-zero-to-hero/
Another amazing alternative for learning NestJS.