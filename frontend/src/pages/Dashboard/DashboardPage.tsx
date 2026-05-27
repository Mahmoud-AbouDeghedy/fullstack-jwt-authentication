import React, { useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { getProfile } from "../../services/api";

const DashboardPage: React.FC = () => {
	const { user } = useAuth();
	const [profileData, setProfileData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfile();
				setProfileData(data);
			} catch (err) {
				setError("Failed to fetch profile data");
			}
		};

		fetchProfile();
	}, []);

	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Typography component="h1" variant="h4" sx={{ mb: 4 }}>
				Welcome to the application
			</Typography>

			{user && (
				<Paper elevation={3} sx={{ p: 3, width: "100%", mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						User Information
					</Typography>
					<Typography>
						<strong>Name:</strong> {user.name}
					</Typography>
					<Typography>
						<strong>Email:</strong> {user.email}
					</Typography>
				</Paper>
			)}

			{profileData && (
				<Paper elevation={3} sx={{ p: 3, width: "100%" }}>
					<Typography variant="h6" gutterBottom>
						Protected Data
					</Typography>
					<Typography>{profileData.message}</Typography>
				</Paper>
			)}

			{error && (
				<Typography color="error" sx={{ mt: 2 }}>
					{error}
				</Typography>
			)}
		</Box>
	);
};

export default DashboardPage;
