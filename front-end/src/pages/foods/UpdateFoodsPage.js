import { Container } from "@mui/material";
import { useState } from "react";
import FormFoodUpdate from "../../components/form/FormFoodUpdate";

const initFood = {
	id: -1,
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [1, 2];
const initImageURLs = [];

function UpdateFoodsPage() {
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<FormFoodUpdate
					value={{ initFood, initCategories, initImageURLs }}
					edit={false}
				/>
			</Container>
		</>
	);
}

export default UpdateFoodsPage;
