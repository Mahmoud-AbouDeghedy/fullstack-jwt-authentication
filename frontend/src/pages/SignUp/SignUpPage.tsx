import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { signUp } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	name: yup
		.string()
		.min(3, "Name should be of minimum 3 characters length")
		.required("Name is required"),
	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
			"Password must contain at least one letter, one number, and one special character"
		)
		.required("Password is required"),
});

const SignUpPage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	const formik = useFormik({
		initialValues: {
			email: "",
			name: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				setError(null);
				const response = await signUp(values);
				login(response.access_token, response.user);
				navigate("/dashboard");
			} catch (err: any) {
				setError(
					err.response?.data?.message || "An error occurred during sign up."
				);
			}
		},
	});

	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Typography component="h1" variant="h5">
				Sign Up
			</Typography>

			{error && (
				<Alert severity="error" sx={{ width: "100%", mt: 2 }}>
					{error}
				</Alert>
			)}

			<Box
				component="form"
				onSubmit={formik.handleSubmit}
				sx={{ mt: 1, width: "100%" }}
			>
				<TextField
					margin="normal"
					fullWidth
					id="email"
					name="email"
					label="Email Address"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="name"
					name="name"
					label="Name"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="password"
					name="password"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={formik.isSubmitting}
				>
					Sign Up
				</Button>

				<Box sx={{ textAlign: "center", mt: 2 }}>
					<Typography variant="body2">
						Already have an account?{" "}
						<Button
							variant="text"
							onClick={() => navigate("/signin")}
							sx={{ p: 0 }}
						>
							Sign In
						</Button>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default SignUpPage;
