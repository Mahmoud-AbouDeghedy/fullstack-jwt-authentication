# Full-Stack JWT Authentication

A full-stack authentication application with a React + TypeScript frontend and a NestJS + MongoDB backend.

The project demonstrates a complete authentication flow: user registration, login, JWT issuance, protected routes, profile display, form validation, and API documentation. It is intentionally compact, but it still shows the core moving parts of a secure full-stack auth workflow.

## Features

- User registration with server-side validation.
- Sign-in flow with JWT access tokens.
- Password hashing with bcrypt.
- MongoDB user persistence through Mongoose.
- Passport JWT strategy and route guard for protected APIs.
- React authentication context with local token persistence.
- Protected frontend routes.
- Sign-in, sign-up, and dashboard pages.
- Material UI components and responsive layout.
- Axios API client for frontend/backend communication.
- Swagger documentation for backend endpoints.

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Material UI
- Formik
- Yup
- Axios

### Backend

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- Passport
- bcrypt
- Swagger
- Jest

## Repository Structure

```text
backend/
  src/
    auth/       Auth controller, service, DTOs, JWT guard, and strategy
    users/      User service, schema, module, and interface
    app.module.ts
    main.ts
frontend/
  src/
    components/ Shared layout, protected route, and UI cards
    contexts/   Auth context and session state
    hooks/      Auth hook
    pages/      Sign in, sign up, and dashboard views
    services/   Axios API client
    types/      Shared frontend types
package.json    Root scripts for running both apps
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm
- MongoDB connection string

### 1. Install dependencies

```bash
npm run install:all
```

Or install each side separately:

```bash
npm run install:backend
npm run install:frontend
```

### 2. Configure the backend

Copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

Then set your local values:

```env
MONGODB_URI=mongodb://localhost:27017/authentication-app
JWT_SECRET=replace-with-a-local-development-secret
JWT_EXPIRES_IN=1d
PORT=3001
```

### 3. Run the backend

```bash
npm run start:backend
```

Backend API:

```text
http://localhost:3001
```

Swagger docs:

```text
http://localhost:3001/api
```

### 4. Run the frontend

```bash
npm run start:frontend
```

Frontend app:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run start:backend
npm run start:frontend
npm run build:backend
npm run build:frontend
npm run test:backend
npm run test:frontend
```

## Design Notes

- The backend keeps authentication concerns inside a dedicated NestJS module.
- Passwords are hashed before persistence.
- JWT payloads carry the user ID and email.
- The frontend centralizes session state in `AuthContext`.
- Protected routes keep unauthenticated users away from private dashboard views.

## Why This Project Matters

This project is useful as portfolio evidence for roles involving React, NestJS, TypeScript, authentication, JWT, protected routes, MongoDB, form validation, and full-stack API integration.
