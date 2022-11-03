import axios from "axios";

const API_CART = process.env.REACT_APP_API_HOST

const getCartQuantity = async (customerId) => {
    
    try {
        const res = await axios.get(`${API_CART}/customers/${customerId}/carts/quantity`);
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

const getListCart = async (customerId) => {

    try {
        const res = await axios.get(`${API_CART}/carts/customers/${customerId}`);
        
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

const deleteCartById = async (cartId) => {
    try {
        const res = await axios.delete(`${API_CART}/carts/${cartId}`);
        
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

const saveCard = async (cart) => {

    try {
        const res = await axios.post(`${API_CART}/carts`,
            cart);
        console.log(res.data)
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

export const CartService = {
    getCartQuantity,
    saveCard,
    getListCart,
    deleteCartById
};
