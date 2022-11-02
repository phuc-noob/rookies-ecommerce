import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Copyright from "../layout/CopyRight";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AlertMsg from "../layout/AlertMessage";
import { AuthContext } from "../../helpers/context/authContext";

export default function RegisterForm() {
	const { loginUser, registerUser, alertAuth, setAlertFail } = useContext(AuthContext);
	const [stateForm, setStateForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const onChangeForm = (e) => {
		console.log(e.target.value)
		setStateForm((pre) => {
			return {
				...pre,
				[e.target.name]: e.target.value,
			};
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(stateForm)
		const registerData = await registerUser(stateForm);
		if (registerData && registerData.status === 200) {
			// const data = {"username":registerData.data.email,"password":stateForm.password}
			// console.log(data.password)
			const loginData = await loginUser({ "username": registerData.data.email, "password": stateForm.password })
			console.log(loginData)
		}else{
			console.log(registerData)
			setAlertFail({ message: registerData.description || "Server off" });
		}

	};

	return (
		<Container
			sx={{
				backgroundColor: "white",
				p: 5,
				minHeight: "600px",
				borderRadius: "16px",
				background: "white",
				boxShadow: 3,
			}}
			maxWidth="xs"
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid container>
							<AlertMsg {...alertAuth} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={onChangeForm}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
								onChange={onChangeForm}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={onChangeForm}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={onChangeForm}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={onChangeForm}
							/>
						</Grid>

					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to={"/login"}>Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	);
}
