import axios from "axios";
import Cookies from 'universal-cookie';

const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const API_ORDER = process.env.REACT_APP_API_HOST

const saveOrder = async (order) => {
    
    try {
        const res = await axios.post(`${API_ORDER}/orders`,order);
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

    
const getOrders = async () => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.get(`${API_ORDER}/orders`, {
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



export const OrderService = {
    getOrders,
    saveOrder
};
