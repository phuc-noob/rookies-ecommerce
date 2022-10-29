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
function FoodCard(pros) {
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

	return (
		<WrapperCard>
			<Card sx={{ height: "auto" }}>
				<CardActionArea>
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
									{pros.categoryName.join(" - ")}
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
