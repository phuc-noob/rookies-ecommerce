import { Container } from "@mui/material";
import FormCategoriesUpdate from "../../components/form/FormCategoriesUpdate";
const initFood = {
	id: -1,
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [1, 2];
const initImageURLs = [];

function UpdateCategoriesPage() {
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<FormCategoriesUpdate
					value={{ initFood, initCategories, initImageURLs }}
					edit={false}
				/>
			</Container>
		</>
	);
}

export default UpdateCategoriesPage;
