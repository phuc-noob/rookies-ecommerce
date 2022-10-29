import { Container } from "@mui/material";
import FormFood from "../../components/food/FormFood";
import InfoFood from "../../components/food/InfoFood";

function DetailFood() {
	return (
		<>
			<Container maxWidth="xl" sx={{ marginTop: "70px" }}>
				<InfoFood />
			</Container>
		</>
	);
}

export default DetailFood;
