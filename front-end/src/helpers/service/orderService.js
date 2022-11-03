import axios from "axios";

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

export const OrderService = {
    saveOrder
};
