import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/signin");
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Auth App
					</Typography>
					{isAuthenticated ? (
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<Box>
							<Button color="inherit" onClick={() => navigate("/signin")}>
								Sign In
							</Button>
							<Button color="inherit" onClick={() => navigate("/signup")}>
								Sign Up
							</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
				{children}
			</Container>
		</>
	);
};

export default Layout;
