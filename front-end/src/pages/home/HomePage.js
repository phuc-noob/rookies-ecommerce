import Banner from "../../components/home/Banner";
import { Divider } from "@mui/material";
import TopItems from "../../components/home/TopItems";
import Information from "../../components/home/Information";
import { useEffect, useState } from "react";
import { ProductService } from "../../helpers/service/ProductService";
import {CategoryService} from "../../helpers/service/categoryService"
import ListCategory from "../../components/home/ListCategory";


function HomePage() {
	const [dataTopFood,setData] = useState([])
	const [dataCategory,setCate] = useState([])
	useEffect(()=>{
		const fetchApi = async ()=>{
			const food = await ProductService.getProduct(0);
			setData(food);
			const cate = await CategoryService.getCategory(0);
			setCate(cate);
		}
		fetchApi()
	},[])
	
	return (
		<>
			<Banner />
			<Divider sx={{ my: 8, borderBottom: 2 }} />
			<TopItems dataTopFood={dataTopFood} />
			<ListCategory dataCategory={dataCategory}/>
			<Information />
		</>
	);
}

export default HomePage;
