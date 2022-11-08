import { Container } from "@mui/material";
import { useState } from "react";
import FormFood from "../../components/food/FormFood";
import FormCategories from "../../components/form/FormCategories";

const initFood = {
	id: -1,
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [1, 2];
const initImageURLs = [];

function CreateCategoriesPage() {
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<FormCategories
					value={{ initFood, initCategories, initImageURLs }}
					edit={false}
				/>
			</Container>
		</>
	);
}

export default CreateCategoriesPage;
