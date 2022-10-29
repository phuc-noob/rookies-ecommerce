import { Container, Grid, Pagination } from "@mui/material";
import ListFoods from "../../components/food/ListFoods";
import OptionViewFoods from "../../components/food/OptionViewFood";
import { useState ,useEffect } from "react";
import { ProductService } from "../../helpers/service/ProductService";

// const dataFoods = [
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
// 	{
// 		id: 4,
// 		picture: "#",
// 		name: "Bún Bò Huế 65 - Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 5,
// 		picture: "#",
// 		name: "Bún Bò Huế 32 - Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 6,
// 		picture: "#",
// 		name: "Bún Bò Huế 32- Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// 	{
// 		id: 7,
// 		picture: "#",
// 		name: "Bún Bò Huế 32- Khâm Thiên",
// 		category: ["Bún", "Phở Mì", " Hủ tiếu"],
// 	},
// ];

const MaxPage = 5;
function MyFoodsPage() {
	const [dataFoods,setData] = useState([])
	useEffect(()=>{
		const fetchApi = async ()=>{
			const result = await ProductService.getProduct();
			setData(result);
		}
		fetchApi()
	},[])
	const [page, setPage] = useState(1);
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<Grid container>
					<Grid container lg={3}>
						<OptionViewFoods />
					</Grid>
					<Grid
						container
						lg={9}
						justifyContent={"center"}
						gap={3}
						sx={{ pl: 2 }}
					>
						<ListFoods data={dataFoods} />
						<Grid container justifyContent={"end"}>
							<Pagination
								page={page}
								onChange={(e, page) => setPage(page)}
								count={MaxPage}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<Grid sx={{ position: "fixed", bottom: "150px", right: "10%" }}></Grid>
		</>
	);
}

export default MyFoodsPage;
