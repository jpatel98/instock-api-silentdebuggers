# InStock Server

An Inventory Management System for a client that maintains a list of warehouses. Built by a team of three web developers using Agile methodology and daily scrums. Built with MVC pattern in mind. Source of data is a MySQL database. Using knex.js to interact with the db. 

A [front-end application](https://github.com/jpatel98/instock-client-silentdebuggers) accompanies this server.

## Tech Stack

![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
## Run Locally

To run the server side locally, clone the project

```bash
  git clone git@github.com:jpatel98/instock-api-silentdebuggers.git
```

Go to the project directory

```bash
  cd instock-api-silentdebuggers
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

## Connect to DB and data seeding

To connect the server with the databse we use a SQL query builder, knex.js. 

Install knex.js if it has not yet been installed:

```bash
  npm install knex --save
```

Create a new database named "instock" on your local machine using the [mysql client tool](https://www.mysqltutorial.org/mysql-create-database/).

Once the database has been created, run the latest migration file to build the database table. To do this run the command as follows:

```bash
  npm run migrate
```

Once the tables have been created we can seed them to populate the tables with data. To do this run:

```bash
  npm run seed
```
## API Reference


### GET `/warehouses`

Get information from all warehouses.

  ```json
  [
      {
    "id": 1,
    "name": "Manhattan",
    "address": "503 Broadway",
    "manager": "Parmin Aujla",
    "phone": "+1 (646) 123-1234",
    "email": "paujla@instock.com",
    "city": "New York",
    "country": "USA"
  },
  {
    "id": 2,
    "name": "Washington",
    "address": "33 Pearl Street SW",
    "manager": "Greame Lyon",
    "phone": "+1 (646) 123-1234",
    "email": "glyon@instock.com",
    "city": "Washington",
    "country": "USA"
  }
  ]
  ```

### GET `/warehouses/:id`

Get a single warehouse

- `/warehouses/1`:

  ```json
  {
  "id": 1,
  "name": "Manhattan",
  "address": "503 Broadway",
  "city": "New York",
  "country": "USA",
  "position": "Warehouse Manager",
  "manager": "Parmin Aujla",
  "phone": "+1 (646) 123-1234",
  "email": "paujla@instock.com",
  "updated_at": "2022-10-31T15:21:13.000Z"
  }
  ```

### GET `/warehouses/:id/inventories`

Get inventory for a given warehouse 

- `/api/warehouses/1/inventories`:

  ```json
  [
    {
      "id": 1,
      "warehouse_id": "2922c286-16cd-4d43-ab98-c79f698aeab0",
      "item_name": "Television",
      "description": "This 50\", 4K LED TV provides a crystal-clear picture and vivid colors.",
      "category": "Electronics",
      "status": "In Stock",
      "quantity": 500
    },
    {
      "id": 2,
      "warehouse_id": "2922c286-16cd-4d43-ab98-c79f698aeab0",
      "item_name": "Gym Bag",
      "description": "Made out of military-grade synthetic materials, this gym bag is highly durable, water resistant, and easy to clean.",
      "category": "Gear",
      "status": "Out of Stock",
      "quantity": 0
    }
  ]
  ```

### POST `/warehouses`

Add a new warehouse. 
Needs the following JSON object for each request
  ```json
  {
    "name": "Chicago",
    "address": "3218 Guess Rd",
    "city": "Chicago",
    "country": "USA",
    "manager": "Jameson Schuppe",
    "phone": "+1 (919) 797-2875",
    "email": "jschuppe@instock.com"
  }
  ```

### PUT `/warehouses/:id`

Edit a warehouse, given its ID.

- Request body should have the following properties as an example:

- `/warehouses/1`:

  ```json
  {
    "name": "Chicago",
    "address": "3218 Guess Rd",
    "city": "Chicago",
    "country": "USA",
    "manager": "Jameson Schuppe",
    "phone": "+1 (919) 797-2875",
    "email": "jschuppe@instock.com"
  }
  ```
### DELETE `/warehouses/:id`

Delete a warehouse, given its ID. 

### GET `/inventories/:id`

Get a single item, given its inventory ID. 

- `/inventories/1`:

  ```json
  {
    "id": 1,
    "itemName": "Television",
    "description": "This 50 inch, 4K LED TV provides a crystal-clear picture and vivid colors.",
    "warehouseName": "Manhattan",
    "warehouseID": 1,
    "quantity": 500,
    "category": "Electronics",
    "status": "In Stock",
    "updated_at": "2022-10-31T15:21:13.000Z"
  }
  ```

### POST `/inventories`

Create a new inventory item.

- Request body should have the following properties as an example:
  ```json
  {
    "itemName": "Television",
    "description": "This 50 inch, 4K LED TV provides a crystal-clear picture and vivid colors.",
    "warehouseID": 1,
    "quantity": 500,
    "category": "Electronics",
    "status": "In Stock"
  }
  ```

### PUT `/inventories/:id`

Edit an inventory item, given its ID.

- Request body should have the following properties as an example:

- `/inventories/1`

  ```json
  {
    "itemName": "Television",
    "description": "This 50 inch, 4K LED TV provides a crystal-clear picture and vivid colors.",
    "warehouseID": 1,
    "quantity": 500,
    "category": "Electronics",
    "status": "In Stock"
  }
  ```
### DELETE `/inventories/:id`

Delete an item, given its ID.



## Deployment

The server has been deployed on heroku with JawsDB provisioning the DB.
