# Church Social Media App - Database Schema

## Overview

The database uses PostgreSQL and is organized around the following main entities:
- Users
- Posts & Comments
- Events & RSVPs
- Donations
- Volunteers

---

## Tables

### Users Table
Stores user profile information.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  profile_image_url VARCHAR(500),
  bio TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields:**
- `id`: Unique identifier
- `email`: User's email (unique)
- `password_hash`: Hashed password (never store plaintext)
- `is_admin`: Flag for admin users
- `bio`: User bio/profile description

---

### Posts Table
Stores user posts, prayers, testimonies, etc.

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'regular',
  visibility VARCHAR(50) DEFAULT 'public',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields:**
- `type`: regular, prayer, testimony, announcement
- `visibility`: public, private, members-only
- `user_id`: Foreign key to users table

---

### Comments Table
Stores comments on posts.

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Reactions Table
Stores likes/reactions to posts and comments.

```sql
CREATE TABLE reactions (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_type VARCHAR(50) DEFAULT 'like',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id, reaction_type)
);
```

**Key Fields:**
- `reaction_type`: like, love, pray, etc.
- `UNIQUE constraint`: Prevents duplicate reactions from same user

---

### Events Table
Stores church events.

```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(500),
  organizer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  capacity INT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Event RSVPs Table
Stores event attendee responses.

```sql
CREATE TABLE event_rsvps (
  id SERIAL PRIMARY KEY,
  event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'interested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);
```

**Status Values:**
- attending
- interested
- not attending
- maybe

---

### Donations Table
Stores donation records.

```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  fund_name VARCHAR(255),
  transaction_id VARCHAR(255),
  payment_method VARCHAR(50),
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields:**
- `is_anonymous`: Whether donor identity is hidden
- `fund_name`: Building fund, missions, general, etc.
- `transaction_id`: Payment processor transaction ID

---

### Volunteers Table
Stores volunteer information.

```sql
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Status Values:**
- active
- inactive
- on-leave

---

### Volunteer Shifts Table
Stores volunteer schedule information.

```sql
CREATE TABLE volunteer_shifts (
  id SERIAL PRIMARY KEY,
  volunteer_id INT NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  shift_date DATE NOT NULL,
  shift_time TIME,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Indexes

Indexes are created for frequently queried columns to improve performance:

```sql
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_events_organizer_id ON events(organizer_id);
CREATE INDEX idx_event_rsvps_event_id ON event_rsvps(event_id);
CREATE INDEX idx_event_rsvps_user_id ON event_rsvps(user_id);
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
```

---

## Relationships Diagram

```
Users
├── Posts
│   ├── Comments
│   └── Reactions
├── Events (as organizer)
│   └── Event RSVPs
├── Donations
└── Volunteers
    └── Volunteer Shifts
```

---

## Sample Queries

### Get all posts from a user
```sql
SELECT p.* FROM posts p
WHERE p.user_id = 1
ORDER BY p.created_at DESC;
```

### Get upcoming events
```sql
SELECT * FROM events
WHERE event_date > NOW()
ORDER BY event_date ASC;
```

### Get event attendance
```sql
SELECT u.first_name, u.last_name, er.status
FROM event_rsvps er
JOIN users u ON er.user_id = u.id
WHERE er.event_id = 1;
```

### Get total donations by fund
```sql
SELECT fund_name, SUM(amount) as total
FROM donations
GROUP BY fund_name;
```

---

## Future Schema Enhancements

- Notifications table
- Prayer requests with follow-up tracking
- Sermon/media storage
- Giving history/statements
- Member groups/small groups
- Message/chat functionality
