import axios from "axios";
import Cookies from 'universal-cookie';

const API_PRODUCT = "http://localhost:8080/api/products";
const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const getProduct = async () => {

    try {
        const res = await axios.get(`${API_PRODUCT}`, {
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
                message: "Server    ",  
            };
    }
};

const filterProduct = async (filter) =>{
    try {
        const queryString = require('query-string');
		const str = queryString.stringify({page:filter.page,size:filter.size,category:filter.category,price:filter.price,priceOn:filter.priceOn,rating:filter.rating},{arrayFormat: 'comma'});
        
        const urlstr = `${API_PRODUCT}?${str}`
        const res = await axios.get(urlstr);
        console.log(urlstr)
        return res.data;
    } catch (err) {
        console.log("err", err, err.response);
        throw err.response.data
            ? err.response.data
            : {
                status: 500,
                message: "Server    ",  
            };
    }
}

const getProductById = async (id) => {
    try {
        const res = await axios.get(`${API_PRODUCT}/${id}`);
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

const saveProduct = async (product) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.post(`${API_PRODUCT}`,product);
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

const deleteProduct = async (id) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.delete(`${API_PRODUCT}/${id}`);
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

const updateProduct = async (product) => {
    const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
    try {
        const res = await axios.put(`${API_PRODUCT}/${product.productId}`,product);
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

const getListRatingByProduct = async (productId) => {
    
    try {
        const res = await axios.get(`${API_PRODUCT}/${productId}/rates`, {
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

export const ProductService = {
    getListRatingByProduct,
    deleteProduct,
    saveProduct,
    filterProduct,
    updateProduct,
    getProduct,
    getProductById
};
