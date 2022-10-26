import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../helpers/context/AuthContext";
import styled from "@emotion/styled";
import Loadding from "../../components/layout/Loadding";
function AuthPage({ authRoute }) {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);
	let body;
	if (authLoading) {
		body = <Loadding />;
	} else if (isAuthenticated) {
		return <Navigate to="/" replace />;
	} else {
		body = authRoute === "login" ? <LoginForm /> : <RegisterForm />;
	}
	return <Wrapper className="container-fluid">{body}</Wrapper>;
}

const Wrapper = styled.div`
	background-color: hsl(218, 41%, 15%);
	background-image: url("/image/bgAuth1.png");
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	opacity: 0.8;
`;
export default AuthPage;
