import {
	Divider,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	Paper,
	Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DialogCreateFood from "../../components/food/dialog/DialogCreateFood";
import GridsCustomers from "../../components/food/grid/GridCustomers";
import { SearchRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AdminCustomersPage() {
	const [open, setOpen] = useState(false);
	const nagivate = useNavigate()
	const handleClickOpen = () => {
		nagivate("/admin/customers/new")
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Paper levation={3} sx={{ mr: 3, px: 3, py: 2 }}>
				<Grid container direction={"column"}>
					<Grid container>
					<Typography variant="h4" color="black" sx={{ fontWeight: "bold" }}>
							List Customers
						</Typography>
					</Grid>
					<Divider sx={{ my: 2, borderColor: "grey.500" }} />
					<Grid container justifyContent={"end"}>
						<FormControl
							sx={{
								borderRadius: "16px",
								px: 2,
								minWidth: 150,
							}}
							variant="filled"
						>
							<Input
								id="standard-adornment-amount"
								sx={{
									alignItems: "flex-start",
								}}
								startAdornment={
									<InputAdornment position="start">
										<SearchRounded />
									</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>
					<GridsCustomers />
				</Grid>
			</Paper>

			<Grid sx={{ position: "fixed", bottom: "10%", right: "10%" }}>
				<Fab color="primary" aria-label="add" onClick={handleClickOpen}>
					<AddIcon />
				</Fab>
				<DialogCreateFood open={open} handleClose={handleClose} />
			</Grid>
		</>
	);
}

export default AdminCustomersPage;
