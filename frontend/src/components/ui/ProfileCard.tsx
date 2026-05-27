import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface ProfileCardProps {
	name: string;
	email: string;
	message: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, message }) => {
	return (
		<Card elevation={3} sx={{ p: 3, width: "100%" }}>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					User Information
				</Typography>
				<Typography>
					<strong>Name:</strong> {name}
				</Typography>
				<Typography>
					<strong>Email:</strong> {email}
				</Typography>
				<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
					Protected Data
				</Typography>
				<Typography>{message}</Typography>
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
