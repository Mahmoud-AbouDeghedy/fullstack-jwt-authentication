import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { signIn } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

// Validation schema
const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

const SignInPage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				setError(null);
				const response = await signIn(values);
				login(response.access_token, response.user);
				navigate("/dashboard");
			} catch (err: any) {
				setError(err.response?.data?.message || "Invalid email or password.");
			}
		},
	});

	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Typography component="h1" variant="h5">
				Sign In
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
					Sign In
				</Button>

				<Box sx={{ textAlign: "center", mt: 2 }}>
					<Typography variant="body2">
						Don't have an account?{" "}
						<Button
							variant="text"
							onClick={() => navigate("/signup")}
							sx={{ p: 0 }}
						>
							Sign Up
						</Button>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default SignInPage;
