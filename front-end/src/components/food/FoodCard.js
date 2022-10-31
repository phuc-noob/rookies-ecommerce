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
import styled from "@emotion/styled";
import HoverRating from "./Rating"
import { useContext } from "react";
import { ProductContext } from "../../helpers/context/productContext";
import { useNavigate } from "react-router-dom";
import { Refresh } from "@mui/icons-material";
function FoodCard(pros) {
	const {ProductDetail,loadProductDetail} = useContext(ProductContext)
	const navigate = useNavigate();
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

	const goProductDetailClick = async () =>{
		localStorage.setItem("productId",pros.productId)
		loadProductDetail(pros.productId)
		navigate(`/foods/${ProductDetail.productId}`)
		window.location.reload(false);
		console.log(ProductDetail)
	}

	return (
		<WrapperCard>
			<Card sx={{ height: "auto" }}>
				<CardActionArea onClick={goProductDetailClick}>
					<CardMedia
						component="img"
						height="140"
						image={pros.images[0].imageURL}
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
							<Grid item>{pros.price}$</Grid>
							<HoverRating rate={2.5} />
						</Grid>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Grid container justifyContent={"flex-end"}>
						{option}
					</Grid>
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
