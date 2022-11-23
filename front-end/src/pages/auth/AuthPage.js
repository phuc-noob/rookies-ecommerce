import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../helpers/context/authContext";
import styled from "@emotion/styled";
import Loading from "../../components/layout/Loading";
import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";
function AuthPage({ authRoute }) {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);
	let body;
	if (authLoading) {
		body = <Loading />;
	} else if (isAuthenticated) {
		return <Navigate to="/" replace />;
	} else {
		if (authRoute === "login") {
			body = <LoginForm />;
		} else if (authRoute === "forget-password") {
			body = <ForgetPasswordForm />;
		} else {
			body = <RegisterForm />;
		}
	}
	return <Wrapper className="container-fluid">{body}</Wrapper>;
}

const Wrapper = styled.div`
	background-color: hsl(218, 41%, 15%);
	background-image: url("/image/bg-01.png");
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	opacity: 0.95;
`;
export default AuthPage;
