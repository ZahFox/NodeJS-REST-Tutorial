# Delivery Reporter API

## About This Project

This project is intended to be a private API for me to use so that I will be able to track and analyze the data I collect from my delivery job. This data includes: how many hours I've worked, which store I worked at, what day it was, how much money I made in tips, and the amount of money I spent on gas. Even though I intend to use this API privately, I still decided to share it publicly for two reasons. The first reason is that this API is part of one of my final projects for the advanced topics in programming course at Western Technical College. The second reason is that I'm more than willing to share this code with anyone else who would like to do something similar to this. If you would like to use this project or are interested in how it works, keep reading and you may find what you're looking for. 

**In order to use this project you will need access to an environment with a MySQL database, Git, and Node.JS.**


## Getting Started

### Clone or Download the Repo and Install Node Modules

#### Download this repository using one of the following methods:
* **Clone with Git** `git clone https://github.com/ZahFox/delivery-reporter-api.git`
* **Download Link** `https://github.com/ZahFox/delivery-reporter-api/archive/master.zip`
#### Using the CLI of your preference, navigate to directory that you downloaded this project into and issue the following command:

`npm install`

### Setting Up the Database

This repository contains an SQL [script](./database/mysql-bootstrap.sql) in the database folder that you may use to create the database for this project. Be aware that the queries in this script are intended for MySQL v5.7.20. If you are using a different database, I can't guarentee that this script will work for you. This script will create a default user with `admin` as the username and `admin` as the password. You will also need to edit the default settings in the [config](./src/config.js) file to match your database credentials. I would also recommended changing the secretKey in this file because it will be used to encrypt the tokens this API uses for user authentication.


## Using the API

### Run the Application

Once you have downloaded the project, installed the dependencies, and setup the database, you are one simple command away from running this project!
Make sure that you are in the project's root directory and issue the following command:

`npm start`

### API Routes

If your CLI responded with `listening on 9999`, that means you are ready to get started! This API contains seven routes, five of which require token authentication. This means that only registered users are allowed to create, read, update, and delete report records. I would recommend that you disable the `/register` path after you have created the users that you need. This will prevent random people from creating user accounts. Later versions of this project will have report records that are only accessible by the user that created them, but, for now, all report records are avaiable to all users.


| ROUTE           | METHOD    | AUTH     | DESCRIPTION                                 |
|-----------------|-----------|----------|---------------------------------------------|
| `/reports`      | `GET`     | `true`   | get all report records                      |
| `/reports`      | `POST`    | `true`   | create a new report record                  |
| `/reports/:id`  | `GET`     | `true`   | get a report record using its report_id     |
| `/reports/:id`  | `PUT`     | `true`   | update a report record using its report_id  |
| `/reports/:id`  | `DELETE`  | `true`   | delete a report record using its report_id  |
| `/register`     | `POST`    | `false`  | create a new user record                    |
| `/login`        | `POST`    | `false`  | verify a user login attempt                 |

### Registering Users and Logging In

Before you can use any of the report routes you will need to send a `POST` request to the `/login` route and save the token from the response. This token may be included in any request for a route that requires authentication by adding it as a query parameter, as an x-access-token header, or including it in the body. By default this token will only be valid for one hour. You may login using the default user account or register a new one.

#### /register (POST)

create a new `user` record

**Request:**
```
Method:   POST
URL:      http://localhost:9999/register
Payload:
{
  "username": "test",
  "password": "test"
}
```

**Response:**
```
{
  "affectedRows": 1,
  "insertId": 2
}
```

#### /login (POST)

verify a `user` login attempt

**Request:**
```
Method:   POST
URL:      http://localhost:9999/login
Payload:
{
  "username": "test",
  "password": "test"
}
```

**Response:**
```
{
  "status": "Login Successful!",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
```

### Creating, Reading, Updating, and Deleting Records

The following examples will use the token as an `x-access-token` header for authentication. You will not be able to use the token provided in these examples. It is only there to show what your request would look like.

#### /reports (GET)

get all `report` records

**Request:**
```
Method:   GET
URL:      http://localhost:9999/reports
Headers:
{
  Content-Type: "application/json",
  x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
```

**Response:**
```
[
  {
    "report_id": 7,
    "date": "2017-12-01T06:00:00.000Z",
    "day_of_week": "FRIDAY",
    "store_location": "LOSEY BLVD.",
    "hours_worked": 5,
    "total_tips": 33,
    "gas_money": 7,
    "profit": 26
  },
  ...
]
```

#### /reports (POST)

create a new `report` record

**Request:**
```
Method:   POST
URL:      http://localhost:9999/reports
Headers:
{
  Content-Type: "application/json",
  x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
Payload:
{
  "date": "2017-11-05",
  "day_of_week": "SUNDAY",
  "store_location": "PEARL ST.",
  "hours_worked": 6.33,
  "total_tips": 42,
  "gas_money": 13,
  "profit": 29
}
```

**Response:**
```
{
  "affectedRows": 1,
  "insertId": 8
}
```

#### /reports/:id (GET)

get a `report` record using its `report_id`

**Request:**
```
Method:   GET
URL:      http://localhost:9999/reports/7
Headers:
{
  Content-Type: "application/json",
  x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
```

**Response:**
```
{
  "report_id": 7,
  "date": "2017-12-01T06:00:00.000Z",
  "day_of_week": "FRIDAY",
  "store_location": "LOSEY BLVD.",
  "hours_worked": 5,
  "total_tips": 33,
  "gas_money": 7,
  "profit": 26
}
```

#### /reports/:id (PUT)

update a `report` record using its `report_id`

**Request:**
```
Method:   PUT
URL:      http://localhost:9999/reports/7
Headers:
{
  Content-Type: "application/json",
  x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
Payload:
{
  "hours_worked": 24,
  "total_tips": 9001,
  "gas_money": 0,
  "profit": 9001
}
```

**Response:**
```
{
  "affectedRows": 1,
  "changedRows": 1
}
```

#### /reports/:id (DELETE)

delete a `report` record using its `report_id`

**Request:**
```
Method:   DELETE
URL:      http://localhost:9999/reports/8
Headers:
{
  Content-Type: "application/json",
  x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTI2MzA2MzgsImV4cCI6MTUxMjYzNDIzOH0.VX894n8QoHhltjxMfiA7q6rKCOb7FqZxO6bfNXeEgNM"
}
```

**Response:**
```
{
  "affectedRows": 1
}
```
