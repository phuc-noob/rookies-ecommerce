import Banner from "../../components/home/Banner";
import { Divider } from "@mui/material";
import TopItems from "../../components/home/TopItems";
import Information from "../../components/home/Information";
import { useEffect, useState } from "react";
import { ProductService } from "../../helpers/service/ProductService";
import ListCategory from "../../components/home/ListCategory";

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
			<ListCategory/>
			<Information />
		</>
	);
}

export default HomePage;
