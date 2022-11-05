import { Container } from "@mui/material";
import { useState } from "react";
import FormFood from "../../components/food/FormFood";

const initFood = {
	id: -1,
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [1, 2];
const initImageURLs = [];

function FoodPage() {
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<FormFood
					value={{ initFood, initCategories, initImageURLs }}
					edit={false}
				/>
			</Container>
		</>
	);
}

export default FoodPage;
