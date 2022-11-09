import axios from "axios";
import Cookies from 'universal-cookie';

const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;
const API_VERIFY = process.env.REACT_APP_API_HOST + "/auth";
const API_LOGIN = process.env.REACT_APP_API_HOST + "/auth/login";
const API_REGISTER = process.env.REACT_APP_API_HOST + "/auth/register";
const cookies = new Cookies();

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const logout = async () => {
	
	await cookies.remove(LOCAL_STORAGE_TOKEN_NAME,{ path: '/' })
	await cookies.remove(LOCAL_STORAGE_TOKEN_NAME, { path: '/carts' })
	await cookies.remove(LOCAL_STORAGE_TOKEN_NAME, { path: '/foods' })
	setAuthToken();
	
};

const login = async (userForm) => {
	console.log("userForm", userForm);

	try {
		const res = await axios.post(`${API_LOGIN}`, userForm);
		if (res.data) {
			
			cookies.set(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
		}
		// localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
		console.log("login")
		return res.data;
	} catch (err) {
		console.log("err", err, err.response);
		throw err.response.data
			? err.response.data
			: {
				status: 500,
				message: "Server error",
			};
	}
};
const loadUser = async () => {
	const cookies = new Cookies();
	console.log("load user")
	if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
	try {
		const res = await axios.get(`${API_VERIFY}`);
		console.log(res.data)
		return res.data;
	} catch (err) {
		logout();
		throw err.response.data
			? err.response.data
			: {
				status: 500,
				message: "Server error",
			};
	}
};
const register = async (userForm) => {
	try {
		const res = await axios.post(`${API_REGISTER}`, userForm);
		return res;
	} catch (err) {
		throw err.response.data
			? err.response.data
			: {
				status: 500,
				message: "Server error",
			};
	}
	
};
export const authService = {
	setAuthToken,
	login,
	logout,
	loadUser,
	register,
};
