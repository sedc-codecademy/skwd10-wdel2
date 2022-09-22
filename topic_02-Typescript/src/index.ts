/*
IMPORTANT! REGARDING INSTALLING AND COMPILING TYPESCRIPT
1. Install NodeJS. (When prompted don't install additional tools such as Chocolatey.)
2. Install GitBash. This is semi-optional. It will make your life extremely easier. When prompted, make it so you can start git bash anywhere.
3. Install typescript globally. (npm install typescript -g)
4. Init a typescript project. This will create your typescript file. (tsc --init)
5. To compile multiple files at the same time, and also not bother with writing the name of the file every time you compile, 
  add the name of the files in the files property of tsconfig.json (Check out my tsconfig.json in this example. Line 100 in there.)
  After this you can just use tsc and it will compile all files.
6. Use  tsc --watch if you want to re-compile realtime
*/

// Declaring a variable
let myNumber = 5;

const obj = {
  name: "Ivan",
  age: 30,
};

console.log(obj);

// [Basic Types]
/* 
- number
- string
- boolean
- undefined (doesn't have any value)
- any (avoid using any)

- null (does have value, the value is null)
- array
*/

let id: number = 1;
// This is fine
id = 5;
// This is not
// id= 'Ivan';
let username: string = "ivan";
let registered: boolean = true;

let customVariable: any = {};
customVariable = 5;

// [Array]

/* 
Arrays in Typescript can also be given types to work with. This prevents us from adding elements of different types within the array,
giving us type safety.
*/

let names: string[] = ["Ivan", "Jack", "Jill"];
names.forEach((name) => {
  console.log(name, `Length of name: ${name.length}`);
});

// [Tuple]
/*
A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
*/

let personTuple: [number, string, boolean] = [1, "Ivan", true];
let employees: [number, string][] = [
  [1, "Jack"],
  [2, "Anna"],
  [3, "Alice"],
];

// [Union]
// Sometimes, it's possible for a variable to come in different types. TypeScript unions allows us to use more than one data type for a variable or a function parameter.
// Very useful. Very commonly used.
let unionId: number | string | undefined = 1;
unionId = "ivan-123-123";
unionId = undefined;

// [Enum]
// Enums allow a developer to define a set of named constants. 
// Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

enum Actions {
  FORWARD = "W",
  BACKWARDS = "S",
  LEFT = "A",
  RIGHT = "D",
}
// By default, the values here are 0, 1, 2, 3 etc. But you can set them in the enum.

const playerAction = {
  name: "Ivan",
  lastAction: Actions.FORWARD,
};

if (playerAction.lastAction === Actions.FORWARD) {
  console.log("Player moved forward.");
}

// We don't want to do this. We want more generic conditions.
// if (playerAction.lastAction === 'W') {
// }

enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "progress",
  CLOSED = "closed",
  CANCELLED = "cancelled",
}

const firstTicket = {
  id: 1,
  title: "Design the header.",
  status: TicketStatus.OPEN,
};

const secondTicket = {
  id: 2,
  title: "Design the footer.",
  status: TicketStatus.CLOSED,
};

const ticketArray = [firstTicket, secondTicket];
let noOfClosedTickets: number = 0;
ticketArray.forEach((ticket) => {
  if (ticket.status === TicketStatus.CLOSED) {
    noOfClosedTickets++;
  }
});
console.log(`You have closed ${noOfClosedTickets} ticket/s this week.`);

// [Objects]
/*
In JavaScript, the fundamental way that we group and pass around data is through objects. 
In TypeScript, we represent those through object types.
Each property in an object type can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.
*/


type User = {
  id: number;
  name: string;
  registered: boolean;
  lastUserAction: Actions;
};

const firstUser: User = {
  id: 1,
  name: "Alice",
  registered: false,
  lastUserAction: Actions.FORWARD,
};
const secondUser: User = {
  id: 2,
  name: "Bob",
  registered: true,
  lastUserAction: Actions.BACKWARDS,
};

const userArray: User[] = [firstUser, secondUser];
userArray.forEach((user: User) => {
  if (user.registered) {
    console.log(`${user.name} is registered.`);
  }
});

// Never do this
// You can't reuse this type.
const otherUser: { id: string; name: string } = {
  id: "a1b2",
  name: "Ivan",
};

// [Type Infer]
let numberId = 1;

// [Type Assertion]
/*
Sometimes you’ll end up in a situation where you’ll know more about a value than TypeScript does. 
Usually, this will happen when you know the type of some entity could be more specific than its current type.
Type assertions are a way to tell the compiler “trust me, I know what I’m doing.” 
A type assertion is like a type cast in other languages, but it performs no special checking or restructuring of data. 
It has no runtime impact and is used purely by the compiler. TypeScript assumes that you, the programmer, have performed any special checks that you need.
*/

let customerId: any = "1";
let cId = <number>customerId;
// This will not work. cId is explicitly a number.
// cId = '5';

// [Functions]
/* 
TypeScript can usually infer the intended type arguments in a generic call, but not always. Hence, it is useful for us to explicitly
specify the argument types within the function definition.
Functions in JavaScript often take a variable number of arguments. 
We can model this in TypeScript by marking the parameter as optional with ?
It is also a good practice to always specify the return type of the value that the function will produce.
*/


function addNum(
  firstNumber: number = 0,
  secondNumber: number = 0,
  message?: string
): string {
  if (message) {
    return message;
  }
  return `${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`;
}

function logger(message: string | number): void {
  console.log(`Your message: ${message}`);
}

logger(addNum(11, 5, "Hello World!"));

// [Interface]
/*
It’s pretty common to have types that might be more specific versions of other types. 
This is where interfaces come in play. 
Interface is a structure that defines the contract in your application. It defines the syntax for classes to follow.
Classes that implement an interface must follow the structure provided by their interface. 
The TypeScript compiler does not convert interface to JavaScript.
*/

interface Rating {
  averageRate: number;
  numberOfVotes: number;
}

interface Message {
  readonly id: number;
  text: string;
  rating: Rating;
  year?: number;
}

const quickMessage: Message = {
  id: 1,
  text: "Hello World",
  rating: {
    averageRate: 3.5,
    numberOfVotes: 4789,
  },
};

// Cannot assign to 'id' because it is a read-only property.
// quickMessage.id = 5;

const secondQuickMessage: Message = {
  id: 2,
  text: "This is typescript.",
  rating: {
    averageRate: 4.2,
    numberOfVotes: 7289,
  },
};

const messagesArray: Message[] = [quickMessage, secondQuickMessage];

messagesArray.forEach((message: Message) => {
  if (message.rating.averageRate > 4) {
    console.log(`Message: [${message.text}] is higly rated.`);
  }
});

// [Function Interfaces]
/*
Interfaces can also be applied to functions. 
Interfaces ensure that all callers of functions that implement the interface supply the required arguments,
and also return the required value type.
*/

interface MathFunction {
  (firstArg: number, secondArg: number): number;
}

const addTwoNumbers: MathFunction = (first: number, second: number): number => {
  return first + second;
};

const multiplyTwoNumbers: MathFunction = (
  first: number,
  second: number
): number => first * second;

console.log(multiplyTwoNumbers(31, 42));

// [Classes]

/*
Traditional JavaScript uses functions and prototype-based inheritance to build up reusable components, 
but this may feel a bit awkward to programmers more comfortable with an object-oriented approach, 
where classes inherit functionality and objects are built from these classes.
*/

/* ACCESS MODIFIERS */
/*
In our examples, we’ve been able to freely access the members that we declared throughout our programs. 
If you’re familiar with classes in other languages, you may have noticed in the above examples we haven’t had to use the word public to accomplish this; for instance, 
C# requires that each member be explicitly labeled public to be visible. In TypeScript, each member is public by default.
You may still mark a member public explicitly.
- Public, means that the parameter can be accessed from anywhere
- Protected, means that the parameter can be accessed from the class, or the classes extend from that class
- Private, means that the parameter can only be accessed within the class
There are two ways of accessing private fields/properties of a class.
1. You can either create methods that specifically return or set the value. Example: getPersonId()
2. Rely on Typescripts getter/setter syntax. Example get id(): number {return this._id};
*/

class Person {
  private _id: number = 1;
  name: string;
  status: boolean;
  static pi: number = 3.14;

  constructor(name: string, status: boolean) {
    this.name = name;
    this.status = status;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  static printPi() {
    console.log(`Pi is 3.14`);
  }

  printPersonName() {
    console.log(this.name);
  }
}

const student: Person = new Person("John", false);
console.log(student.printPersonName());

console.log(Person.pi);
Person.printPi();

// [Inheritance]

/*
Classes can also extend other classes. A feature of object oriented programming called inheritance.
This example shows the most basic inheritance feature: classes inherit properties and methods from base classes.
 Derived classes are often called subclasses or children, and base classes are often called superclasses or parents.
*/

/*
Each derived class that contains a constructor function must call super() which will execute the constructor of the base class. 
What’s more, before we ever access a property on this in a constructor body, we have to call super(). This is an important rule that TypeScript will enforce.
*/

interface Position {
  posX: number;
  posY: number;
  posZ: number;
}

class Actor {
  id: number;
  name: string;
  public status: boolean;
  protected phoneNumber: number = 123456;
  constructor(id: number, name: string, status: boolean) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

class Entity extends Actor {
  private _position: Position = { posX: 0, posY: 0, posZ: 0 };
  constructor(id: number, name: string, status: boolean) {
    super(id, name, status);
  }

  get position(): Position {
    return this._position;
  }

  printPhoneNumber() {
    console.log(`Phone number: ${this.phoneNumber}`);
  }
}

const firstEntity: Entity = new Entity(1, "Ivan", true);
firstEntity.position.posX = 5;
console.log(firstEntity);

// [Inheritance with classes and interfaces]
/*
Classes can implement interfaces. They can implement as much interfaces as you want.
Implementing an interface means that the class signs a contract that it will implement the methods
and properties that were defined in the interface.
*/

class Parent {
  house: boolean;
  lastName: string;
  constructor(house: boolean, lastName: string) {
    this.house = house;
    this.lastName = lastName;
  }

  buyCar(): boolean {
    console.log('Parent bought a car!');
    return false;
  }
}

interface Job {
  getAJob(): boolean;
}

interface Singing {
  singASong(song?: string): void;
}

class Child extends Parent implements Job, Singing {
  name: string;
  constructor(name: string, house: boolean, lastName: string) {
    super(house, lastName);
    this.name = name;
  }
  getAJob(): boolean {
    console.log(`${this.name} ${this.lastName} got a job!`);
    return true;
  }
  singASong(song?: string | undefined): void {
    if (song) {
      console.log(song);
    } else {
      console.log("The kid doesnt want to sing.");
    }
  }

  // Method Override
  buyCar(): boolean {
    console.log(`${this.name} bought a car!`);
    return true;
  }
}

const kid: Child = new Child("Kid", true, "Kidovski");
kid.getAJob();
kid.singASong();
kid.buyCar();