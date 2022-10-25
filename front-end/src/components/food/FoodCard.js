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
						image={pros.picture}
						alt="image food"
						sx={{ p: 3 }}
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
									{pros.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{pros.category.join(" - ")}
								</Typography>
							</Grid>
							<Grid item>100$</Grid>
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
