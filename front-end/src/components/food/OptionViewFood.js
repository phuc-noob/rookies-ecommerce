import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Input,
	InputAdornment,
	Box,
	TextField,
	Divider,
} from "@mui/material";

import { SearchRounded } from "@mui/icons-material";
import { Container } from "react-bootstrap";

function OptionViewFoods() {
	return (
		<>
			<Grid
				container
				bgcolor={"gray"}
				direction="column"
				alignItems="center"
				sx={{ minHeight: "150px" }}
			>
				<Typography variant="h5" component="h5">
					My foods
				</Typography>

				<Divider />

				<Container maxWidth={"lg"}>
					<FormControl fullWidth sx={{ borderRadius: "16px" }} variant="filled">
						<Input
							id="standard-adornment-amount"
							startAdornment={
								<InputAdornment position="start">
									<SearchRounded />
								</InputAdornment>
							}
						/>
					</FormControl>

					<FormControl fullWidth sx={{ mt: 2 }}>
						<InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
						<Select
							labelId="demo-simple-select-standard-label"
							id="demo-simple-select-standard"
							// value={age}
							// onChange={handleChange}
							label="Age"
							fullWidth
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Container>
			</Grid>
		</>
	);
}

export default OptionViewFoods;
