import { Container, Grid, Pagination } from "@mui/material";
import ListFoods from "../../components/food/ListFoods";
import OptionViewFoods from "../../components/food/OptionViewFood";
import { ProductService } from "../../helpers/service/productService";
import { useState, useContext ,useEffect } from "react";
import { ProductContext } from "../../helpers/context/productContext";
const MaxPage = 5;
function MyFoodsPage() {
	const products = useContext(ProductContext)
	const [dataFoods,setData] = useState([])

	console.log(products.ListProduct)
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
						<ListFoods data={products.ListProduct} />
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
