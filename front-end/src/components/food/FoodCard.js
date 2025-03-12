import {
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	Typography,
	CardActions,
	Button,
	Grid,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import styled from "@emotion/styled";
import HoverRating from "./Rating"
import { AuthContext } from "../../helpers/context/AuthContext";
import { useContext } from "react";
import { ProductContext } from "../../helpers/context/productContext";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../helpers/context/orderContext";

function FoodCard(pros) {
	const {
		authState: { isAuthenticated, user, authorization }
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const {
		ProductFilter,
		loadProductFilter,
		ListProduct,
		loadListProductByCate, 
		ProductDetail, 
		loadProductDetail ,
		setProductId} = useContext(ProductContext)
	const { CartQuantity, loadQuantity, loadListCart } = useContext(OrderContext)

	const option = pros.edit ? (
		<>
			<Button size="small" color="primary">
				Edit
			</Button>
			<Button size="small" color="primary">
				Remove
			</Button>
		</>
	) : (
		<Button size="small" color="primary">
			Add cart
		</Button>
	);

	const addCartClick = async () => {

		if (!pros.edit)
			console.log("add cart")
		if (isAuthenticated) {
			const cart = {
				"customerId": user.customerId,
				"productId": pros.productId,
				"amount": 1
			}
			console.log(user.customerId)
			loadListCart(cart)
			loadQuantity(user.customerId)
		}
		else
			console.log("add not ok")
		console.log(pros.productId)
		console.log(user.customerId)
		console.log(CartQuantity)
	}

	const goProductDetailClick = async () => {
		const arr =[];
		pros.categories.map(e=>{
			arr.push(e.cateId)
		})
		console.log(arr)
		const filter ={...ProductFilter,category:arr}
		loadProductFilter(filter)
		localStorage.setItem("productId", pros.productId)
		console.log(ListProduct)
		navigate(`/foods/${ProductDetail.productId}`)
		console.log(pros.categories[0].cateId)
		loadProductDetail(pros.productId)
		//window.location.reload(false);
		setProductId(pros.productId)
		console.log(ProductDetail.rating)
	}

	return (
		<WrapperCard>
			<Card sx={{ height: "auto" }}>

				<CardActionArea onClick={goProductDetailClick}>
					<CardMedia
						component="img"
						height="140"
						image={pros.images.length!==0?pros.images[0].imageURL:""}
						alt="image food"
					// sx={{ p: 3 }}
					/>
					<CardContent>
						<Grid container justifyContent={"space-between"}>
							<Grid container lg={10}>

								<Typography
									gutterBottom
									variant="body1"
									fontWeight={700}
									lineHeight={1.1}
									whiteSpace={0.5}
								>
									{pros.productName}
								</Typography>
								<Typography variant="body2" color="text.secondary" width={200}>
									{pros.categories.map(category => category.cateName).join('- ')}
								</Typography>
							</Grid>
							<Grid item>{pros.price} VNĐ</Grid>
							<HoverRating rate={pros.rating} />
						</Grid>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Grid onClick={addCartClick} container justifyContent={"flex-end"}>
						<Button variant="outlined" sx={{
								color:"#16802C",
								borderColor:"#16802C"
							}} fullWidth>
							<AddShoppingCart fontSize="small" />
						</Button>
					</Grid>
					{/* <Grid onClick={addCartClick} container justifyContent={"flex-end"}>
						{option}
					</Grid> */}
				</CardActions>
			</Card>
		</WrapperCard>
	);
}
const WrapperCard = styled.div`
	&:hover {
		transform: scale(1.02);
	}
`;

export default FoodCard;
