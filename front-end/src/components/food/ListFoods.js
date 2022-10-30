import { Container, Grid, Button } from "@mui/material";
import FoodCard from "./FoodCard";

function ListFoods({ data }) {
	return (
		<Grid container direction={"column"} gap={3}>
			<Grid container spacing={2} columnSpacing={4}>
				{data.map((e) => {
					return (
						<Grid item md={3} xs={6}>
							<FoodCard edit={false} {...e} />
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default ListFoods;
