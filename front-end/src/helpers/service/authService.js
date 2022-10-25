import axios from "axios";

const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;
const API_VERIFY = process.env.REACT_APP_API_HOST + "/auth";
const API_LOGIN = process.env.REACT_APP_API_HOST + "/auth/login";
const API_REGISTER = process.env.REACT_APP_API_HOST + "/auth/register";

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const logout = () => {
	localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
	setAuthToken();
};

const login = async (userForm) => {
	console.log("userForm", userForm);

	try {
		const res = await axios.post(`${API_LOGIN}`, userForm);
		if (res.data)
			localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.data.accessToken);
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
	if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
		setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
	} else {
		throw Error("Dont have token");
	}

	try {
		const res = await axios.get(`${API_VERIFY}`);
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
	if (userForm.password !== userForm.confirmPassword) {
		throw Error("confirm password not matching!");
	}
	try {
		const res = await axios.post(`${API_REGISTER}`, userForm);
		return res.data;
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
