import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/common/Layout";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/signin" element={<SignInPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				}
			/>
			<Route path="/" element={<Navigate to="/dashboard" />} />
		</Routes>
	);
};

const App: React.FC = () => {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<AppRoutes />
				</Layout>
			</AuthProvider>
		</Router>
	);
};

export default App;
