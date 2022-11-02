import axios from "axios";

const API_CATEGORY= "http://localhost:8080/api/categories";

const getCategory = async () => {

    try {
        const res = await axios.get(`${API_CATEGORY}`);
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

const getListProductByCategory = async (id)=>{
    try {
        const res = await axios.get(`${API_CATEGORY}/${id}/products`, {
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


export const CategoryService = {
    getCategory,
    getListProductByCategory,
};
