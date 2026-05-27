export interface User {
	id: string;
	email: string;
	name: string;
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface SignUpFormValues {
	email: string;
	name: string;
	password: string;
}

export interface SignInFormValues {
	email: string;
	password: string;
}
