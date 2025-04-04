
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
# Anatolij API

## Description
Anatolij API is a simple RESTful API designed for user management. This API allows clients to retrieve a list of users and add new users.

## Base URL
```
http://localhost:8080
```

## Endpoints

### 1. Welcome Message
**Endpoint:**
```
GET /
```
**Description:**
Returns a simple welcome message.

**Response:**
```json
{
  "message": "Hello User!"
}
```
**Status Codes:**
- `200 OK` - Successful response

---

### 2. Get Users List
**Endpoint:**
```
GET /users
```
**Description:**
Retrieves a list of users.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Anatolij",
    "password": "securepassword"
  },
  {
    "id": 2,
    "name": "JohnDoe",
    "password": "hashedpassword"
  }
]
```
**Status Codes:**
- `200 OK` - Returns the list of users

---

### 3. Add a New User
**Endpoint:**
```
POST /users
```
**Description:**
Adds a new user to the database.

**Request Body:**
```json
{
  "name": "NewUser",
  "password": "newpassword"
}
```
**Response:**
- `201 Created` - User successfully added
- `400 Bad Request` - JSON validation error

---

## Data Schema
**User Object:**
```json
{
  "id": 1,
  "name": "Anatolij",
  "password": "securepassword"
}
```
- `id` *(integer)* - Unique identifier for the user.
- `name` *(string)* - The username.
- `password` *(string)* - The user's password.

---

## Setup Instructions
To run this API locally, ensure that you have a web server running on `http://localhost:8080`. You can test the endpoints using tools like:
- [Postman](https://www.postman.com/)

## C# Dependences
- System.Net
- Microsoft.EntityFrameworkCore
- System.Text.Json
- System.Text
- System.Collections.Generic