# Authentication App - Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

A modern React application for user authentication built with TypeScript, React Router, and Material UI.

## Features

- User registration with email validation
- Login with JWT authentication
- Protected routes for authenticated users
- User profile dashboard
- Clean, responsive UI with Material UI components
- Form validation with Formik and Yup

## Technology Stack

- **React** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Material UI** - Component library
- **Axios** - API requests
- **Formik & Yup** - Form handling and validation
- **JWT** - Token-based authentication

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

2. Navigate to the frontend directory

```bash
cd Authentication-App/frontend
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Create a `.env` file with the backend URL

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Running the Application

```bash
npm start
# or
yarn start
```

The application will run on [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/    # Reusable UI components
├── contexts/      # React contexts including AuthContext
├── hooks/         # Custom hooks
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript interfaces
├── App.tsx        # Main application component
└── index.tsx      # Entry point
```

## Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App
npm run eject
```

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Troubleshooting

### Common Issues

- **API Connection Errors**: Check that the backend server is running and REACT_APP_API_URL is set correctly
- **Authentication Issues**: Ensure JWT token is being properly stored and sent with requests
- **Routing Problems**: Verify that protected routes are properly configured with the auth context

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For more information about React, check out the [React documentation](https://reactjs.org/).
