import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import CardStatistic from "../../components/order/CardStatistic";
import GridListOrder from "../../components/order/GridListOrder";

function AdminOrderPage() {
	return (
		<>
			<Paper levation={3} sx={{ mr: 3, px: 3, py: 2 }}>
				<Grid container direction={"column"}>
					<Grid container>
						<Typography variant="h4" color="black" sx={{ fontWeight: "bold" }}>
							List Order
						</Typography>
					</Grid>
					<Divider sx={{ my: 2, borderColor: "grey.500" }} />
					<Grid container spacing={4} justifyContent="flex-end">
						<Grid item lg={2}>
							<CardStatistic title={"Total order"} data={"12"} />
						</Grid>
						<Grid item lg={2}>
							<CardStatistic title={"Total order"} data={"12"} />
						</Grid>
						<Grid item lg={2}>
							<CardStatistic title={"Total order"} data={"12"} />
						</Grid>
					</Grid>

					<Grid container sx={{ pr: 5, mt: 3 }}>
						<GridListOrder />
					</Grid>
				</Grid>
			</Paper>
		</>
	);
}

export default AdminOrderPage;
