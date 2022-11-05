import axios from "axios";
import Cookies from 'universal-cookie';

const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;
const API_CUSTOMER= "http://localhost:8080/api/customers";
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};
const getListCustomers = async () => {
    try {
        const res = await axios.get(`${API_CUSTOMER}`, {
            params: {
                page: 0,
                size: 8
            }
        });

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
}

const saveCustomer = async (customers) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.post(`${API_CUSTOMER}`, customers);
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
}

export const CustomersService = {
    saveCustomer,
    getListCustomers
};
