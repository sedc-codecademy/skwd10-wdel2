# MongoDB

## How to install/setup MongoDB on your machine?

**Main Link**

https://www.mongodb.com/

**Download/Useful Links**
https://www.mongodb.com/try/download/community - mongoDB community server (use MSI installer)

https://www.mongodb.com/try/download/shell?jmp=docs - mongosh (mongo shell)

https://www.mongodb.com/try/download/database-tools - Database Tools (Might come in handy, use the MSI)

### Data Links

MOVIE DATA: https://github.com/erik-sytnyk/movies-list/blob/master/db.json

PRODUCT DATA: https://fakestoreapi.com/products

Other data provided in the .json files

## What is MongoDB?

MongoDB is a NoSQL database program. MongoDB uses JSON-like documents with optional schemas. 
MongoDB is developed by MongoDB Inc. It's name is derived from the word *humongous*.
The MongoDB database is based on collections and documents. A document is similar, and for most intents and purposes
the same as a JSON/Javascript object. It's the equivalent of a table row in SQL.
A collection is just a list/array of documents, and is the equivalent of a table in SQL.
NoSQL is schemaless by default, but it allows for the creation and usage of schemas.
MongoDB uses BSON as its primary storage architecture.

JSON and BSON are close cousins, as their nearly identical names imply, but you wouldn’t know it by looking at them side-by-side.
JavaScript objects (and JSON) are simple associative containers, wherein a string key is mapped to a value (which can be a number, string, function, or even another object).

BSON simply stands for “Binary JSON,” and that’s exactly what it was invented to be. BSON’s binary structure encodes type and length information, which allows it to be parsed much more quickly.

MongoDB also does not impose relationships between data, but you can create relations through either embedded documents, or references.

## Accessing MongoDB

MongoDB can be accessed through different ways, including 
1. Shell Terminal
2. MongoDB Compass (GUI)
3. MongoDB Drivers (Libraries for different backend languages)

## How to see all DBs
show dbs

## How to create a database?

use name_of_db

- This will *not* create the database. You need to insert data inside the database first.

## MongoDB CRUD (Create / Read / Update / Delete)

*hint* : To copy paste in terminal, right click on the terminal task bar, go to properties, enable ctrl+shift + C/V

### DATABASES AND THEIR COLLECTIONS
flights = (flightData, people)
people = (users, customers)
tododb = (todos)

### CREATE

#### Query Syntax

db.collection.insertOne(data, options)
- Data should be an object
- Options is also an object, and is used to configure the query

db.collection.insertMany(dataArray, options)
- Used to add an array of objects [{}, {}, {}]
- Array inserts can be ordered or unordered.
- If an ordered insert fails, it cancels the entire operation but it does NOT rollback the already written documents.
- With {ordered: false} in the config/options, you make it so that writing continues to insert after the failed document.

**Examples:**

db.people.insertOne({name: "Ivan", age: 30})
db.people.insertMany([{name: "Steve", age: 30}, {name: "Smith", age: 42}])

*hint*: .insert() also exists, but should not be used because it's not descriptive.
When you insert a document in an unexisting collection, the collection gets created

#### Atomicity

Operations sometimes fail. Atomicity means that if something fails midway, nothing is saved, everything is rolled back.
MongoDB guarantees atomicity on a document level, including embedded documents.
This means that a document will always be either saved as a whole, or rolled back as a whole.

### READ

#### Query Syntax

db.collection.find(filter, options)
- filter is an object, and it defines a query filter. Equivalent of SQL WHERE part.
db.flightData.find()

db.collection.findOne(filter, options)
flights> db.flightData.findOne({_id: ObjectId("616ef60ac15949ddce857a34")})
- Returns the first such document that fulfills the query filter criteria.
#### Operators

db.flightData.find({distance: {$gt: 10000}}) 
- Greater than. Checks if the document field is greater than a certain value

db.flightData.find({distance: {$lt: 10000}}) 
- Greater than. Checks if the document field is lesser than a certain value
- $gte and $lte also exist. They are used to check if a value is greater or equal / lesser or equal than a certain value.

db.flightData.find({intercontinental: {$ne: false}}) 
- Checks if a value is NOT equal to some value.
- $eq also exists. It's used to check for equality. {intercontinental: {$eq: false}} is the equivalent of {intercontinental: false}

db.movies.find({runtime: {$in: [30, 42]}}) 
{director: {$in: ["Francis Ford Coppola", "Christopher Nolan"]}}
- You can use this to check for multiple values.

db.movies.find({runtime: {$nin: [30, 42]}}) 
- The opposite of $in. Checks which entries do NOT have these values.

##### Multiple Operators/Filters

**Logical OR**

db.products.find({$or: [
{"rating.rate": {$lt: 2.9}},
{"rating.rate": {$gt: 4.5}}
]})

- $nor is the opposite of $or. It finds the document where neither filter is true.

**Logical AND**
db.products.find({
$and: [
{"rating.rate": {$gt: 3}},
{"category": "jewelery"}
]})

**Logical NOT**
db.movies.find({runtime: {$not: {$eq: 60}}})

- Remember that the $not operator only affects other operators and cannot check fields and documents independently. 
- So, use the $not operator for logical disjunctions and the $ne operator to test the contents of fields directly.

**Important!**

- The .find() method returns a cursor object. This is pretty much just a fragment of the data. 
- This feature exists, and is enabled by default to prevent automatically pulling millions of results.
- To force the .find() method to return everything, you can chain db.collection.find({})**.toArray()** onto it.

#### Projection

- Sometimes you don't need to return all data. Just like selecting specific columns in SQL, you can do this in MongoDB too.

db.passengers.find({}, {name: 1}).pretty()
- The fields you want to return should be placed in the options object, as shown above.
- This query will only return the name.
- The _id is also always returned, unless you explicitly exclude it with _id: 0

#### Embedded Documents
- Core feature of MongoDB.
- Document within a document. A property of a document is a document itself.
- Allows up to 100 levels of nesting.
- Allows document size of up to 16 MB

#### Accessing Structured Data / Embedded Documents

**Examples:**

db.passengers.findOne({name: "Albert Twostone"}).hobbies
db.flightData.find({"status.description"}: "on-time")


### UPDATE

#### Syntax

db.collection.updateOne(filter, data, options)
- data is an object, tells MongoDB which fields it's supposed to update

db.collection.updateMany(filter, data, options)

db.passengers.updateOne(
{_id: ObjectId("some-id-here")}, 
{$set: {hobbies: ["reading", "hiking"]}}
)

db.passengers.updateMany(
{age: {$gt: 28}},
{$set: {isOld: true}}
)

- Both updateOne() and updateMany() will add a property if it doesn't exist, and update it if it does.
- You can use an empty object (updateMany({})) to target ALL documents in a collection.  This also works with deleteMany({})
- Don't forget $set

### DELETE

#### Syntax

db.collection.deleteOne(filter, options)
db.collection.deleteMany(filter, options)

- To fully drop a collection, you can use db.name_of_collection.drop()

## Data Types in MongoDB

* Text
* Number (NumberInt (Int32), NumberLong(Int64), NumberDecimal(Float))
* Boolean
* ObjectId
* ISODate
* Embedded Document
* Array

Example: 

db.companies.insertOne({
name:"Apples", 
isStartup: true, 
employees: 33, 
funding: 12345678901234567890, 
details: {ceo: "Mark Super"},
foundingDate: new Date(),
insertedAt: new Timestamp(),
tags: ["super", "perfect"]
})

- Funding will be cutoff because the number is too big for its data type.
- A Timestamp is a special type of object. It represents the seconds passed between 01.01.1970 and now.


## Schemas And Relationships

### Why do we use Schemas?

Having some schema is better than no schema. MongoDB will not enforce them, but they are absolutely useful.
For example, we don't want to have a store DB where some products are missing something like a price field.

### Structuring Documents

- Chaotic approach - Middleground - SQL World
- In reality, you will work with either middleground or SQL-like data structure/strictness

### How to derive the data structure? - Requirements

- Which data do I need? (Defines the fields.)
- Where do I need my data? (Defines required collections and field groupings.)
- Which kind of data or info do I want to display? (Define Queries.)
- How often do I write or change my data? (Define whether you need to optimize.)

## Relationship

### One to One - Embedded

A problem that arises when using references to establish a relationship between two documents is that it requires two steps to
first .findOne() the original document (e.g. a Patient document), and then use the ID of the related document to .findOne() that one.

#### Example, with references:
- db.patients.insertOne({name: "Ivan", age: 30, diseaseSummary: "summary-ivan-1"})
- db.diseaseSummaries.insertOne({_id: "summary-ivan-1", diseases: ["cold", "broken arm"]})

So, for hard 1-1 relationships, it's better to go with nested documents.

#### Example
- db.patients.insertOne({name: "Ivan", age: 30, diseaseSummary: ["cold", "broken arm"]})

### One to One - References

Sometimes, we would like to structure the data to be more friendly to analytics and statistics.
With something like a collection of cars, and a collection of car owners we might want to analyze just the car data.

#### Example
- db.carOwners.insertOne({name: "Ivan", car: {model: "Lada", price: 2000}})
- db.cars.insertOne({model: "Lada", price: 2000, owner: ObjectId("car_owner_id")})

### One to Many - Embedded

In some cases, one document will have a relationship with many documents. 
One such case is Q/A or Quiz questions. A Question can have multiple answers.
If we go with references, we still face the same problem as before. That one extra request. So, embedding might be beter here,
and it makes sense for the data to be modelled like this, because you always need both the questions and answers at the same time.
Questions don't usually have thousands of answers, so you don't risk hitting the 16 MB limit.
EVERY CASE IS DIFFERENT! Model your data the way you need it!

#### Example

- db.questionThreads.insertOne(
{creator: "Ivan", 
question: "How often do I get billed?",
answers: [{answer: "Monthly."}, {answer: "Yearly."}]
})

### One to Many - References

Another One to Many example would be cities and citizens.
Theoretically we could embed, but from an app perspective you might be interested about fetching cities, but not the people.
And it's not feasible to embed the citizens' ID's within the city because cities have thousands, if not millions of citizens.
This is a good place to use references. 

- db.cities.insertMany([
{name: "Skopje", coordinates: {lat: 21, lng: 42}},
{name: "Nish", coordinates: {lat: 24, lng: 35}}
])

- db.citizens.insertMany([
{name: "Ivan", age: 30, cityId: ObjectId("Skopje")},
{name: "Nikola", age: 25, cityId: ObjectId("Nish")}
])

### Many to Many - Embedded

When working with Many to Many relationships, often times this is done through an intermediary table.
You could go full SQL way, but depending on your data needs you might even go with a combination of referenced and embedding,
or fully commit to embedding data.

The disadvantage of fully embedding is duplicate data. If you do a lot of embedding, it can lead to a lot of duplicate embedded documents.
One such example would be the cars and car owners. Multiple users can own the same car model, so it wouldn't make sense to duplicate the car model
everywhere. Another example would be the shop with customers and orders.


- db.shopCustomers.insertOne({
name: "Ivan",
age: 30
})

- db.shopCustomers.updateOne(
{_id: ObjectId("customer_id")},
{$set: {orders: [{title: "A Book", price: 10.99, qty: 1}]}}
)

### Many to Many - References

Another example of Many to Many is with books and authors. A Book can have multiple authors, and an author will usually write multiple books.
With embedded documents, this might be potentially problematic. We would always want the latest data on the authors, and their fields (such as age)
might change often enough.

- db.books.insertMany([
{title: "Book 1"},
{title: "Book 2"}
])

- db.authors.insertMany([
{name: "John"},
{name: "Maria"}
])

- db.books.updateOne(
{_id: ObjectId("")},
{$set: {authors: [
ObjectId("author_id"),
ObjectId("other_author_id")
]}}
)