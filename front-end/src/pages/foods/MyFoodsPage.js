import { Container, Grid, Pagination } from "@mui/material";
import ListFoods from "../../components/food/ListFoods";
import OptionViewFoods from "../../components/food/option/OptionViewFood";
import { useState, useContext, useEffect  } from "react";
import { ProductContext } from "../../helpers/context/productContext";
const MaxPage = 5;
function MyFoodsPage() {
	const { ProductFilter, ListProduct, loadProductFilter } = useContext(ProductContext)
	
	console.log(ListProduct)
	const [page, setPage] = useState(1);

	// useEffect(()=>{
	// 	const filter = { 
    //         ...ProductFilter, 
    //         page:page-1
    //     }
	// 	setPage(ProductFilter.page+1)
		
	// 	loadProductFilter(filter)
	// },[])

	const paginProduct = (e, page) =>{
		const filter = { 
            ...ProductFilter, 
            page:page-1
        }
        loadProductFilter(filter)
		setPage(page)
		console.log(page)
	}
	
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "100px",marginLeft:"50px"}}>
				<br/>
				<Grid container>
					<Grid container lg={2}>
						<OptionViewFoods />
					</Grid>
					<br/>
					<Grid
						container
						lg={9}
						justifyContent={"center"}
						gap={3}
						sx={{ pl: 2 }}
					>
						<ListFoods data={ListProduct} />
						<Grid container justifyContent={"end"}>
							<Pagination
								page={page}
								onChange={paginProduct}
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
