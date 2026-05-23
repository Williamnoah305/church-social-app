# Church Social Media App

A comprehensive social media platform designed specifically for churches to engage their congregation and community.

## Features

✅ **Community & Discussion**
- Member feed with posts, prayers, and testimonies
- Comments and reactions
- Prayer request board

✅ **Events Management**
- Church calendar
- Event details and RSVP system
- Event notifications

✅ **Spiritual Content**
- Sermon library and archive
- Daily devotionals
- Bible verses
- Livestream integration

✅ **Volunteer Coordination**
- Sign-up sheets
- Role assignments
- Schedule management

✅ **Giving & Donations**
- Secure donation processing
- Giving history
- Fund allocation transparency

✅ **User Management**
- Member profiles
- Public/private profile options
- Admin dashboard

✅ **Notifications**
- Email notifications
- Push notifications
- Real-time updates

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Axios for API calls

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Docker

## Project Structure

```
church-social-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/                  # Express server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.ts
│   ├── database/
│   │   └── migrations/      # DB migrations
│   └── package.json
├── database/                 # Database schema
│   └── schema.sql
├── docker-compose.yml
├── .env.example
└── docs/                     # Documentation
    ├── API.md
    ├── DATABASE.md
    └── SETUP.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Williamnoah305/church-social-app.git
   cd church-social-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d
   
   # Or manually create PostgreSQL database
   psql -U postgres -f database/schema.sql
   ```

## Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT License - feel free to use this for your church community.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
