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

const updateCustomerById = async (customer) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.put(`${API_CUSTOMER}/${customer.id}`,customer);
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

const getCustomerById = async (id) => {
    try {
        const res = await axios.get(`${API_CUSTOMER}/${id}`);
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

const getListCustomers = async (page,size) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.get(`${API_CUSTOMER}`, {
            params: {
                page: page,
                size: 6
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

const deleteCustomerById = async (id) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.delete(`${API_CUSTOMER}/${id}`);
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

const getOrderByCustomer = async (id) => {
    
    try {
        const res = await axios.get(`${API_CUSTOMER}/${id}/orders`, {
            params: {
                page: 0,
                size: 8
            }
        });
        console.log(res)
        return res.data;
    } catch (err) {
        console.log("err", err, err.response);
        throw err.response.data
            ? err.response.data
            : {
                status: 500,
                message: "Server",
            };
    }
};


export const CustomersService = {
    getOrderByCustomer,
    saveCustomer,
    deleteCustomerById,
    getListCustomers,
    getCustomerById,
    updateCustomerById
};
