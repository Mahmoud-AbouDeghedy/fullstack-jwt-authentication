# Authentication App - Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A secure NestJS backend API for user authentication with JWT token support, built with TypeScript and MongoDB.

## Features

- User registration and authentication
- JWT token generation and validation
- Password hashing with bcrypt
- User data storage with MongoDB
- API documentation with Swagger
- Environment-based configuration
- Complete request validation

## Technology Stack

- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Token-based authentication
- **Passport** - Authentication middleware
- **Bcrypt** - Password hashing
- **Swagger** - API documentation

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory

```bash
cd Authentication-App/backend
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Create a `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
PORT=3001
```

### Running the Application

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at [http://localhost:3001](http://localhost:3001).

## API Documentation

Swagger documentation is available at [http://localhost:3001/api](http://localhost:3001/api)

## Project Structure

- `/src/auth` - Authentication module
- `/src/users` - User management module
- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root module

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Troubleshooting

- **MongoDB Connection Issues**: Ensure your MongoDB instance is running and the connection string is correct
- **JWT Token Errors**: Check that your JWT_SECRET is properly set in the .env file
- **Port Conflicts**: If port 3001 is in use, modify the PORT variable in your .env file

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Additional Information

This project uses the NestJS framework. For more information, visit [https://nestjs.com](https://nestjs.com).
