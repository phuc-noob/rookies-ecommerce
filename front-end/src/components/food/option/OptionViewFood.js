import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Input,
	InputAdornment,
	Divider,
} from "@mui/material";

import { SearchRounded } from "@mui/icons-material";
import FilterCategories from "../../category/FilterCategories";

function OptionViewFoods() {
	return (
		<>
			<Grid
				container
				direction="column"
				alignItems="center"
				sx={{ minHeight: "150px",maxWidth:"250px", border: 1 }}
			>
				<Typography variant="h5" component="h5">
					Tim Kiem
				</Typography>

				<Divider />

				<Grid container>
					<FormControl
						fullWidth
						sx={{ borderRadius: "16px", px: 2 }}
						variant="filled"
					>
						<Input
							id="standard-adornment-amount"
							startAdornment={
								<InputAdornment position="start">
									<SearchRounded />
								</InputAdornment>
							}
						/>
					</FormControl>

					<FilterCategories />
				</Grid>
			</Grid>
		</>
	);
}

export default OptionViewFoods;
