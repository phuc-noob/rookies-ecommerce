import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/context/AuthContext";
import AlertMsg from "../layout/AlertMessage";
import {
	Grid,
	TextField,
	Container,
	Avatar,
	Typography,
	Box,
	Button,
} from "@mui/material";
import { Face } from "@mui/icons-material";
import Copyright from "../layout/CopyRight";
const LoginForm = () => {
	const navigate = useNavigate();
	const { loginUser, alertAuth, setAlertFail } = useContext(AuthContext);
	const [stateForm, setStateForm] = useState({
		username: "",
		password: "",
	});

	const onChangeForm = (e) => {
		setStateForm((pre) => {
			return {
				...pre,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onClickSubmit = async (e) => {
		e.preventDefault();
		const loginData = await loginUser(stateForm);
		console.log("response", loginData);
		if (loginData && loginData.status === 200) {
			navigate("/", { replace: true });
		} else {
			setAlertFail({ message: loginData.message || "Server off" });
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
			<Grid container direction={"column"} alignItems="center">
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<Face />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={onClickSubmit} sx={{ mt: 3 }}>
					<Grid container alignItems={"center"} direction="column" gap={2}>
						<Grid container>
							<AlertMsg {...alertAuth} />
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									label="username"
									name="username"
									value={stateForm.username}
									onChange={onChangeForm}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									type="password"
									label="password"
									name="password"
									value={stateForm.password}
									onChange={onChangeForm}
								/>
							</Grid>
						</Grid>
						{/* option */}
						<Grid container justifyContent="space-between">
							<Grid item>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										value=""
										id="checkRemember"
									/>
									<label className="form-check-label" htmlFor="checkRemember">
										Remember
									</label>
								</div>{" "}
							</Grid>
							<Grid item>
								<div>
									<Link to={"/register"}>Create account?</Link>
								</div>{" "}
							</Grid>
						</Grid>

						<Grid container justifyContent={"center"}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign in
							</Button>
						</Grid>
					</Grid>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Grid>
		</Container>
	);
};

export default LoginForm;
