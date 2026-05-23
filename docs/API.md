# Church Social Media App - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```
POST /auth/logout

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

---

### Posts

#### Get All Posts
```
GET /posts

Response: 200 OK
{
  "posts": [
    {
      "id": 1,
      "title": "Sunday Service",
      "content": "Great service today!",
      "userId": 1,
      "createdAt": "2024-01-15T10:30:00Z",
      "reactions": 5,
      "comments": 2
    }
  ]
}
```

#### Get Single Post
```
GET /posts/:id

Response: 200 OK
{
  "post": { ... }
}
```

#### Create Post
```
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Prayer Request",
  "content": "Please pray for...",
  "type": "prayer",
  "visibility": "public"
}

Response: 201 Created
{
  "message": "Post created",
  "postId": 5
}
```

#### Update Post
```
PUT /posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}

Response: 200 OK
{
  "message": "Post updated"
}
```

#### Delete Post
```
DELETE /posts/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Post deleted"
}
```

#### Add Comment
```
POST /posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post!"
}

Response: 201 Created
{
  "message": "Comment added"
}
```

#### Add Reaction
```
POST /posts/:id/reactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "reactionType": "like"
}

Response: 201 Created
{
  "message": "Reaction added"
}
```

---

### Events

#### Get All Events
```
GET /events

Response: 200 OK
{
  "events": [
    {
      "id": 1,
      "title": "Sunday Service",
      "description": "Weekly worship service",
      "eventDate": "2024-01-21T10:00:00Z",
      "location": "Main Hall",
      "capacity": 500,
      "rsvpCount": 123
    }
  ]
}
```

#### Get Single Event
```
GET /events/:id

Response: 200 OK
{
  "event": { ... }
}
```

#### Create Event
```
POST /events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Youth Group Meeting",
  "description": "Join us for...",
  "eventDate": "2024-01-26T18:00:00Z",
  "location": "Youth Hall",
  "capacity": 100
}

Response: 201 Created
{
  "message": "Event created",
  "eventId": 5
}
```

#### RSVP to Event
```
POST /events/:id/rsvp
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "attending"
}

Response: 201 Created
{
  "message": "RSVP added"
}
```

---

### Users

#### Get User Profile
```
GET /users/:id

Response: 200 OK
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "bio": "Member since 2020",
    "profileImageUrl": "https://...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update User Profile
```
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Updated bio",
  "profileImageUrl": "https://..."
}

Response: 200 OK
{
  "message": "Profile updated"
}
```

#### Get User's Posts
```
GET /users/:id/posts

Response: 200 OK
{
  "posts": [ ... ]
}
```

#### Get User's Events
```
GET /users/:id/events

Response: 200 OK
{
  "events": [ ... ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```
