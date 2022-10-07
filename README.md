# Social Network API

## Description

This is an application that interfaces with a MongoDB database using mongoose ODM.
This is the back end implementation of a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

There are 3 main tables, Categories, Products and Tags.

- A category can have many Products.
- A Product can have many Tags
- A Tag can be against many Products.

These tables are related to develop a relationship as an e-commerce backend .

Express JS routing is used so that a front end can interface with the back end implementation.
This way the database can be searched, items can be created, updated and deleted and relationships with data in tables created properly in the back end.
The details of the API calls are explained in the Express API Information section.

<br>

## Table of Contents

- [GitHub Link](#link)
- [Installation Instructions](#install-instructions)
- [Executing Instructions](#executing-instructions)
- [Database Information](#database-information)
- [Express API Information](#express-api-information)
- [Video Demo](#video-demo)
- [Screen Shots](#screen-shots)

---

## Link

The link to the GitHub repository of the assignment is <br>
[https://github.com/jkoufalas/Social-Network-API](https://github.com/jkoufalas/Social-Network-API)

---

## Install Instructions

### MongoDB

Since this application uses MongoDB there needs to be an instance for the application to connect to.
Therefore the user must install MongoDB before using this application.

The dependancies are listed within the package.json file. The dependancies for this application are

- mongoose
- expressjs

Since the dependancies are listed within the lock file, they will autmatically installed with the following command

```
npm i
```

---

## Executing Instructions

```
node index.js
```

## This will start the application on the server and connect it to the MongoDB database.

## Database Information

The user must have a MongoDB database installed on the machine they are running the application on.

The connection.js file located in the /config folder is what is used to connect to MongoDB and the database within it.
The database is named socialNetwork and the connection string used is.

```
mongodb://localhost/socialNetwork
```

The seed data if required can be inserted into the database by using the command

```
npm run seed
```

There are 2 Models used within the database

### Users

This has the following keys

- username - Of type string. This is a required field must be unique.
- email - Of type string. This is a required field must be unique.
- thoughts - Array of \_id values referencing the Thought model.
- friends - Array of \_id values referencing the User model (self-reference)
- virtual - friendCount - that retrieves the length of the user's friends array field on query.

### Thought

- thoughtText - Of type string. This is a required field and must have a length between 1 and 280 characters.
- createdAt - Of typr Date. Set by default as the current time when created.
- username - Of type string. This is a required field.
- reaction - Array of nested documents created with the reactionSchema
- virtual - reactionCount - that retrieves the length of the thought's reactions array field on query.

There is 1 Schema used

### Reaction

- reactionId - Default value is set to a new ObjectId.
- reactionBody - Of type string. This is a required field.
- username - Of type string. This is a required field.
- createdAt - Of typr Date. Set by default as the current time when created.

## Express API Information

Express.js is used to interact to the database using the routes

### User Routes

- Get /api/users, returns all users
- Get /api/users/:usedId where the id is for a singular user id, returns a single users information
- Post /api/users, creates a user

```
{
  "username": "lernantino121",
  "email": "lernantino121@gmail.com"
}
```

- Put /api/users/:usedId, modifies a user with usedId

```
   {
   "category_name": "Jackets"
   }
```

- delete /api/categories/:id, deletes a category with id

- Get /api/products, returns all products with categories and tags
- Get /api/products/:id where the id is for a singular product id, returns a single product with categories and tags
- Post /api/products, creates a product

```
   {
     "product_name": "hooded jacket denim",
     "price": 150.00,
     "stock": 7,
     "tagIds": [2, 4, 5],
	  "category_id": 2
}
```

- Put /api/products/:id, modifies a product with id

```
   {
     "product_name": "hooded jacket",
     "price": 150.00,
     "stock": 7,
     "tagIds": [3, 2, 4]
   }
```

- delete /api/products/:id, deletes a products with id

- Get /api/tags, returns all tags with products
- Get /api/tags/:id where the id is for a singular product id, returns a single tag with products
- Post /api/tags, creates a tag

```
	{
     "tag_name": "street",
     "productIds": [1, 3, 4]
   }
```

- Put /api/tags/:id, modifies a tag with id

```
   {
     "tag_name": "street",
     "productIds": [1, 3, 4]
   }
```

- delete /api/tags/:id, deletes a tags with id

## Video Demo

[Link to Demo](https://youtu.be/o9FQRxDxySw)

Select the 1080p option for better resolution of text.

The demonstration video covers the following.

- The install instructions.
- How to run the application.
- A walkthrough of all the API calls for Categories, Products and Tags

---

## Screen Shots

![Get Categories](./assets/images/get-categories.png)
![Get Categories by id](./assets/images/get-categories-by-id.png)
![POST categories](./assets/images/post-categories.png)
![PUT Categories](./assets/images/put-categories.png)
![Get Products](./assets/images/get-products.png)
![Get Products by id](./assets/images/get-products-by-id.png)
![POST Products](./assets/images/post-products.png)
![PUT Products](./assets/images/put-products.png)
![Get Tags](./assets/images/get-tags.png)
![Get Tags by id](./assets/images/get-tags-by-id.png)
![POST Tags](./assets/images/post-tags.png)
![PUT Tags](./assets/images/put-tags.png)

---
