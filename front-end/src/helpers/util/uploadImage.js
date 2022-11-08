
import axios from "axios";

const API_CLOUD = "https://api.cloudinary.com/v1_1/dk2peasgq/image/upload" ;

const uploadImage = async (files) => {
    const formData = new FormData()
    formData.append("file",files)
    formData.append("upload_preset","zrzpey5y")
    delete axios.defaults.headers.common["Authorization"];
    try {
        const res = await axios.post(`${API_CLOUD}`,formData);
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

export const ImageUtil = {
    uploadImage
};
