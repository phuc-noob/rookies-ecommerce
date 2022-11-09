import {
	FormControl,
	Grid,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../helpers/context/authContext";
import { ProductContext } from "../../helpers/context/productContext";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../helpers/context/orderContext";
import CarouselImage from "./CarouselImage";
const min = 0;
const max = 10;

function InfoFood() {
	const products = useContext(ProductContext)
	const [value, setValue] = useState(1);
	const {
		authState: { isAuthenticated, user, authorization }
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const { ProductDetail, loadProductDetail } = useContext(ProductContext)
	const { CartQuantity, loadQuantity ,loadListCart} = useContext(OrderContext)

	console.log(products.ProductDetail.images)
	const addToCartClick = ()=>{
		if (isAuthenticated) {
			const cart = {
				"customerId": user.customerId,
				"productId": products.ProductDetail.productId,
				"amount": value
			}
			console.log(user.customerId)

			loadListCart(cart)
			loadQuantity(user.customerId)
		}
		else
			console.log("add not ok")
		console.log(products.ProductDetail)
		console.log(CartQuantity)
	}
	const data = products.ProductDetail.images
	return (
		<>
			<Grid
				container
				spacing={3}
				sx={{ minHeight: "350px", border: 1, borderRadius: 5, paddingY: 1, borderColor: "#E5E3E2" }}
			>
				<Grid item lg={5} md={5}>
					<CarouselImage value={data} />
				</Grid>
				<Grid item lg={7} md={7} sx={{ pr: 5 }}>
					<Grid container direction="column" gap={1}>
						<Typography variant="h5" component="h5">
							<strong>{products.ProductDetail.productName}</strong>
						</Typography>
						<p>
							{products.ProductDetail.description}
						</p>

						<Typography >
							<strong>Category:</strong> {products.ProductDetail?.categories?.map(category => category.cateName).join('-')}
						</Typography>
						<Typography>
							<strong>Status:</strong> available
						</Typography>
						<Typography variant="h5"> {products.ProductDetail.price} VNĐ</Typography>
						<FormControl sx={{ flexDirection: "column" }} >
							<TextField
								type="number"
								inputProps={{ min, max }}
								value={value}
								onChange={(e) => {
									var value = parseInt(e.target.value, 10);
									if (value > max) value = max;
									if (value < min) value = min;
									setValue(value);
								}}
								variant="outlined"
								sx={{
									minWidth: "15px",
									maxWidth: "100px",
								}}
							/>
							<br />
							<Button variant="outlined" sx={{
								maxWidth: "200px",
								color:"#16802C",
								borderColor:"#16802C"
							}}
							onClick={addToCartClick}
							>
								<strong>Add to cart</strong>

							</Button>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default InfoFood;
