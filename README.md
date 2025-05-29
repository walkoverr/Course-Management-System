#course Management System – REST API

A Node.js + Express RESTful backend for managing users, courses, and course packages with role-based authentication and dynamic pricing logic based on user location.

---

# Base URL

```
http://localhost:5000
```

---

##Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (if image uploads are needed)
- dotenv

---

## Authentication

All protected routes require the following HTTP Header:

```
Authorization: Bearer <JWT_TOKEN>
```

JWT token is returned after a successful login.

---

## User Routes

### 1. Register a User

```
POST /api/users/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "location": "India",
  "profileImage": "https://example.com/john.jpg"
}
```

### 2. Login a User

```
POST /api/users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1..."
}
```

---

## Course Routes

### 3. Create a Course

```
POST /api/courses
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Node.js Basics",
  "description": "Learn Node.js from scratch.",
  "price": 30,
  "image": "https://example.com/nodejs.png"
}
```

### 4. Get All Courses

```
GET /api/courses
```

No body or headers needed.

### 5. Get Single Course

```
GET /api/courses/:id
```

No body or headers needed.

### 6. Update a Course

```
PUT /api/courses/:id
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Advanced Node.js",
  "price": 40
}
```

### 7. Delete a Course

```
DELETE /api/courses/:id
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

No body needed.

---

## Package Routes

### 8. Create a Package

```
POST /api/packages/create
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Basic Pack",
  "courses": ["<courseId1>", "<courseId2>", "<courseId3>"]
}
```

> All `courseIds` must belong to the logged-in user.

### 9. Delete a Package

```
DELETE /api/packages/:id
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

No body needed.

---


## Sample Testing Flow

1. Register a user using `/api/users/register`
2. Login to get your JWT token using `/api/users/login`
3. Create courses using `/api/courses`
4. Get course IDs from `/api/courses`
5. Create a package using `/api/packages/create`
6. Fetch packages or delete using `/api/packages/:id`

---

## .gitignore

Ensure this line exists in `.gitignore` to prevent pushing dependencies:

```
node_modules/
```

To remove it from Git:

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from Git"
git push origin main
```

---


Ask for a Postman collection if you want all routes pre-imported for testing.