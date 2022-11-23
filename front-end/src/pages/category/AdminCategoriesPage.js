import {
	Container,
	Divider,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	Pagination,
	Paper,
	Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import DialogCreateFood from "../../components/food/dialog/DialogCreateFood";
import Gridcategories from "../../components/food/grid/GridCategories";
import { SearchRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../helpers/context/productContext";

function AdminCategoiesPage() {
	const [open, setOpen] = useState(false);
	const {ListProduct} = useContext(ProductContext)
	const nagivate = useNavigate()
	const handleClickOpen = () => {
		nagivate("/admin/categories/new")
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
							List Categories
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
					<Gridcategories />
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

export default AdminCategoiesPage;
