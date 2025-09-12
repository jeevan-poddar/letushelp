# LetUsHelp Authentication Setup Guide

This guide will help you set up the complete JWT authentication system with login/register functionality for both providers and users.

## 🚀 Quick Start

### Prerequisites

- PostgreSQL database running
- Bun runtime installed
- Node.js (for frontend)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
bun install

# Create environment file
cp .env.example .env  # Create this file manually with the values below
```

Create a `.env` file in the `backend` directory:

```env
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/letushelp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
FRONTEND_URL=http://localhost:5173
```

```bash
# Initialize database (creates tables)
bun run init-db

# Start development server
bun run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
bun install

# Start development server
bun run dev
```

## 🗄️ Database Schema

The system creates a `users` table with the following structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'provider')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Authentication Features

### Backend Features

- **JWT-based authentication** with configurable expiration
- **Role-based access control** (user/provider)
- **Password hashing** with bcrypt
- **Rate limiting** to prevent abuse
- **CORS protection** for frontend integration
- **Input validation** and error handling
- **Protected routes** with middleware

### Frontend Features

- **Login/Register forms** with role selection
- **Form validation** using Zod and React Hook Form
- **Authentication context** for state management
- **Protected routes** component
- **Automatic token management** in localStorage
- **Role-based dashboards** (user vs provider)
- **Responsive design** with Tailwind CSS

## 📡 API Endpoints

### Authentication Routes

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile (protected)
```

### Request/Response Examples

#### Register

```json
POST /api/auth/register
{
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}

Response:
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "role": "user",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

## 🎨 Frontend Components

### Key Components Created

- `AuthPage` - Combined login/register page
- `LoginForm` - Login form with provider/user checkbox
- `RegisterForm` - Registration form with validation
- `ProtectedRoute` - Wrapper for authenticated routes
- `Header` - Navigation with logout functionality
- `AuthContext` - Global authentication state

### Routes

- `/` - Home page (protected)
- `/auth` - Login/Register page
- `/dashboard` - Role-based dashboard (protected)

## 🔧 Configuration

### Security Features

- **Helmet.js** for security headers
- **CORS** configuration for frontend
- **Rate limiting** (100 requests per 15 minutes)
- **Password requirements** (minimum 6 characters)
- **JWT secret** environment configuration

### Environment Variables

#### Backend (.env)

```env
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/letushelp
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:8080/api
```

## 🛠️ Development Commands

### Backend

```bash
bun run dev      # Start development server with hot reload
bun run start    # Start production server
bun run init-db  # Initialize database schema
```

### Frontend

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
```

## 🚦 Testing the Authentication

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. You'll be redirected to the auth page if not logged in
4. Try registering as both a "user" and "provider"
5. Test login with both roles
6. Verify protected routes and role-based content

## 🎯 User Experience

### Login/Register Flow

1. **Checkbox Selection**: Users can toggle between "user" and "provider" roles
2. **Form Validation**: Real-time validation with error messages
3. **Auto-redirect**: Successful auth redirects to dashboard
4. **Persistent Sessions**: Tokens stored in localStorage
5. **Role-based Content**: Different dashboards for users vs providers

### Security Considerations

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens have configurable expiration
- Protected routes check authentication status
- Role-based access control prevents unauthorized access
- Rate limiting prevents brute force attacks

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and connection string is correct
2. **CORS Errors**: Check FRONTEND_URL in backend .env file
3. **JWT Errors**: Verify JWT_SECRET is set in backend .env
4. **Port Conflicts**: Default ports are 8080 (backend) and 5173 (frontend)

### Database Issues

```bash
# Reset database (if needed)
psql -d letushelp -c "DROP TABLE IF EXISTS users;"
bun run init-db
```

## 📝 Next Steps

The authentication system is ready for:

- **Service Management**: Add CRUD operations for services
- **Booking System**: Implement user-provider bookings
- **Profile Management**: Extended user/provider profiles
- **Payment Integration**: Stripe/PayPal integration
- **Real-time Features**: WebSocket notifications
- **File Uploads**: Profile pictures and documents

## 🔒 Security Best Practices

- Change JWT_SECRET in production
- Use HTTPS in production
- Implement password reset functionality
- Add email verification
- Consider implementing refresh tokens
- Add audit logging for sensitive operations
