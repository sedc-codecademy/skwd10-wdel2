"use strict";
// Declaring a variable
// tsc --watch
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
let id = 1;
// This is fine
id = 5;
// This is not
// id= 'Ivan';
let username = "ivan";
let registered = true;
let customVariable = {};
customVariable = 5;
// [Array]
/*
Arrays in Typescript can also be given types to work with. This prevents us from adding elements of different types within the array,
giving us type safety.
*/
let names = ["Ivan", "Jack", "Jill"];
names.forEach((name) => {
    console.log(name, `Length of name: ${name.length}`);
});
// [Tuple]
/*
A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
*/
let personTuple = [1, "Ivan", true];
let employees = [
    [1, "Jack"],
    [2, "Anna"],
    [3, "Alice"],
];
// [Union]
// Sometimes, it's possible for a variable to come in different types. TypeScript unions allows us to use more than one data type for a variable or a function parameter.
// Very useful. Very commonly used.
let unionId = 1;
unionId = "ivan-123-123";
unionId = undefined;
// [Enum]
// Enums allow a developer to define a set of named constants. 
// Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.
var Actions;
(function (Actions) {
    Actions["FORWARD"] = "W";
    Actions["BACKWARDS"] = "S";
    Actions["LEFT"] = "A";
    Actions["RIGHT"] = "D";
})(Actions || (Actions = {}));
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
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "progress";
    TicketStatus["CLOSED"] = "closed";
    TicketStatus["CANCELLED"] = "cancelled";
})(TicketStatus || (TicketStatus = {}));
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
let noOfClosedTickets = 0;
ticketArray.forEach((ticket) => {
    if (ticket.status === TicketStatus.CLOSED) {
        noOfClosedTickets++;
    }
});
console.log(`You have closed ${noOfClosedTickets} ticket/s this week.`);
const firstUser = {
    id: 1,
    name: "Alice",
    registered: false,
    lastUserAction: Actions.FORWARD,
};
const secondUser = {
    id: 2,
    name: "Bob",
    registered: true,
    lastUserAction: Actions.BACKWARDS,
};
const userArray = [firstUser, secondUser];
userArray.forEach((user) => {
    if (user.registered) {
        console.log(`${user.name} is registered.`);
    }
});
// Never do this
// You can't reuse this type.
const otherUser = {
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
let customerId = "1";
let cId = customerId;
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
function addNum(firstNumber = 0, secondNumber = 0, message) {
    if (message) {
        return message;
    }
    return `${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`;
}
function logger(message) {
    console.log(`Your message: ${message}`);
}
logger(addNum(11, 5, "Hello World!"));
const quickMessage = {
    id: 1,
    text: "Hello World",
    rating: {
        averageRate: 3.5,
        numberOfVotes: 4789,
    },
};
// Cannot assign to 'id' because it is a read-only property.
// quickMessage.id = 5;
const secondQuickMessage = {
    id: 2,
    text: "This is typescript.",
    rating: {
        averageRate: 4.2,
        numberOfVotes: 7289,
    },
};
const messagesArray = [quickMessage, secondQuickMessage];
messagesArray.forEach((message) => {
    if (message.rating.averageRate > 4) {
        console.log(`Message: [${message.text}] is higly rated.`);
    }
});
const addTwoNumbers = (first, second) => {
    return first + second;
};
const multiplyTwoNumbers = (first, second) => first * second;
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
    constructor(name, status) {
        this._id = 1;
        this.name = name;
        this.status = status;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    static printPi() {
        console.log(`Pi is 3.14`);
    }
    printPersonName() {
        console.log(this.name);
    }
}
Person.pi = 3.14;
const student = new Person("John", false);
console.log(student.printPersonName());
console.log(Person.pi);
Person.printPi();
class Actor {
    constructor(id, name, status) {
        this.phoneNumber = 123456;
        this.id = id;
        this.name = name;
        this.status = status;
    }
}
class Entity extends Actor {
    constructor(id, name, status) {
        super(id, name, status);
        this._position = { posX: 0, posY: 0, posZ: 0 };
    }
    get position() {
        return this._position;
    }
    printPhoneNumber() {
        console.log(`Phone number: ${this.phoneNumber}`);
    }
}
const firstEntity = new Entity(1, "Ivan", true);
firstEntity.position.posX = 5;
console.log(firstEntity);
// [Inheritance with classes and interfaces]
/*
Classes can implement interfaces. They can implement as much interfaces as you want.
Implementing an interface means that the class signs a contract that it will implement the methods
and properties that were defined in the interface.
*/
class Parent {
    constructor(house, lastName) {
        this.house = house;
        this.lastName = lastName;
    }
    buyCar() {
        console.log('Parent bought a car!');
        return false;
    }
}
class Child extends Parent {
    constructor(name, house, lastName) {
        super(house, lastName);
        this.name = name;
    }
    getAJob() {
        console.log(`${this.name} ${this.lastName} got a job!`);
        return true;
    }
    singASong(song) {
        if (song) {
            console.log(song);
        }
        else {
            console.log("The kid doesnt want to sing.");
        }
    }
    // Method Override
    buyCar() {
        console.log(`${this.name} bought a car!`);
        return true;
    }
}
const kid = new Child("Kid", true, "Kidovski");
kid.getAJob();
kid.singASong();
kid.buyCar();
