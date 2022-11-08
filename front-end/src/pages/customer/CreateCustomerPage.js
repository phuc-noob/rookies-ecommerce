import { Container, Grid, Typography } from "@mui/material";
import FormCustomer from "../../components/form/FormCustomer";

const initFood = {
	id: -1,
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [1, 2];
const initImageURLs = [];

function CreateCustomerPage() {
	return (
		<>
			<Grid container marginLeft={2}>
				<Typography variant="h6" color="black">
					 Create New Customer
				</Typography>
			</Grid>
			
			<Container maxWidth="xl" sx={{ marginTop: "30px" }}>


				<FormCustomer value={{ initFood, initCategories, initImageURLs }}
					edit={false} />

			</Container>
		</>
	);
}

export default CreateCustomerPage;
