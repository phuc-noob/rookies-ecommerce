import Banner from "../../components/home/Banner";
import { Divider } from "@mui/material";
import TopItems from "../../components/home/TopItems";
import Information from "../../components/home/Information";
import { useEffect, useState } from "react";
import { ProductService } from "../../helpers/service/ProductService";
import { json } from "react-router-dom";
// const dataTopFood = [
// 	{
// 		id: 1,
// 		picture: "#",
// 		name: "Bún Bò Huế 65 - Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 2,
// 		picture: "#",
// 		name: "Bún Bò Huế 32 - Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 3,
// 		picture: "#",
// 		name: "Bún Bò Huế 32- Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 3,
// 		picture: "#",
// 		name: "Bún Bò Huế 32- Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// ];

const dataTopFood = null;
const getdata = async (dataTopFood) => {
	const result = await ProductService.getProduct;
	dataTopFood = result;
}

function HomePage() {
	const [dataTopFood,setData] = useState([])
	useEffect(()=>{
		const fetchApi = async ()=>{
			const result = await ProductService.getProduct();
			setData(result);
		}
		fetchApi()
	},[])
	
	dataTopFood.map(e => {
		console.log(e.images[0].imageURL);
	})
	return (
		<>
			<Banner />
			<Divider sx={{ my: 8, borderBottom: 2 }} />
			<TopItems dataTopFood={dataTopFood} />
			<Information />
		</>
	);
}

export default HomePage;
