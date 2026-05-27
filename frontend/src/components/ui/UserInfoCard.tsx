import React from "react";
import { Paper, Typography } from "@mui/material";
import { User } from "../../types";

interface UserInfoCardProps {
	user: User;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
	return (
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
	);
};

export default UserInfoCard;
