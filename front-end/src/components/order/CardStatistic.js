import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { useContext } from "react";
import { OrdersContext } from "../../helpers/context/OrdersContext";
function CardStatistic({ status }) {
	const {
		ordersState: { statistic },
	} = useContext(OrdersContext);
	return (
		<>
			<Card sx={{ minHeight: 150 }}>
				<CardContent>
					<Grid container justifyContent={"center"} direction="column">
						<Typography
							sx={{ fontSize: 16, fontWeight: 600 }}
							color="text.primary"
							gutterBottom
							justifyContent={"center"}
						>
							{status}
						</Typography>
						<Divider sx={{ mb: 2, borderColor: "grey.500" }} />
						<Typography variant="h2" sx={{ fontWeight: "bold" }}>
							{statistic[status]}
						</Typography>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default CardStatistic;
