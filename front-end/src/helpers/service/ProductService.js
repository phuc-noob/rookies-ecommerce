import axios from "axios";

const API_PRODUCT = "http://localhost:8080/api/products";

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

export const ProductService = {
    filterProduct,
    getProduct,
    getProductById
};
