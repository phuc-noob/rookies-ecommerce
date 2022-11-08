import { Container, Grid, Typography } from "@mui/material";
import FormCustomerUpdate from "../../components/form/FormCustomerUpdate";


function UpdateCustomerPage() {
    
	return (
		<>
			<Grid container marginLeft={2}>
				<Typography variant="h6" color="black">
					 Update Customer ID
				</Typography>
			</Grid>
			
			<Container maxWidth="xl" sx={{ marginTop: "30px" }}>
				<FormCustomerUpdate />
			</Container>
		</>
	);
}

export default UpdateCustomerPage;
