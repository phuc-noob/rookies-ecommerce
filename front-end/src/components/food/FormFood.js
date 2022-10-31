import {
	FormControl,
	Grid,
	Typography,
	Button,
	TextField,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useState } from "react";
import SelectCategories from "../category/SelectCategories";
import UploadImage from "../form/UploadImage";
import CreateFood from "./option/CreateFood";
import UpdateFood from "./option/UploadFood";

const initFood = {
	food_name: "",
	description: "",
	status: true,
	money: "",
};
const initCategories = [];
const initImageURLs = [];

function FormFood({ edit }) {
	const [stateForm, setStateForm] = useState(initFood);
	const [categories, setCategories] = useState(initCategories);
	const [imageURLs, setImageURLs] = useState(initImageURLs);

	const handleChangeText = (e) => {
		setStateForm((pre) => {
			return {
				...pre,
				[e.target.name]: e.target.value,
			};
		});
	};

	const option = edit ? <UpdateFood /> : <CreateFood />;

	return (
		<>
			<Grid
				container
				spacing={2}
				sx={{ minHeight: "350px", border: 1, paddingY: 5 }}
				component={"form"}
			>
				<Grid item lg={5} md={5} sx={{ border: 1, borderRadius: "16px" }}>
					<UploadImage value={imageURLs} setState={setImageURLs} />
				</Grid>
				<Grid item lg={7} md={7}>
					<Grid container direction="column" gap={2} sx={{ pr: 2 }}>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Food name:</strong>
							</Typography>
							<TextField
								variant="standard"
								required
								fullWidth
								name="food_name"
								onChange={handleChangeText}
								value={stateForm.food_name}
							/>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
							required
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Description:</strong>
							</Typography>
							<TextField
								name="description"
								variant="standard"
								multiline
								maxRows={5}
								fullWidth
								onChange={handleChangeText}
								value={stateForm.description}
							/>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Category:</strong>
							</Typography>
							<SelectCategories value={categories} setState={setCategories} />
						</FormControl>

						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Status:</strong>
							</Typography>

							<Select
								labelId="demo-simple-select-standard-label"
								name="status"
								value={stateForm.status}
								onChange={handleChangeText}
								placeholder="Status"
								variant="standard"
							>
								<MenuItem value={true}>Available</MenuItem>
								<MenuItem value={false}>Sold Out</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Money:</strong>
							</Typography>

							<TextField
								variant="standard"
								sx={{ width: 115 }}
								required
								name="money"
								onChange={handleChangeText}
								value={stateForm.money}
							/>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>$</strong>
							</Typography>
						</FormControl>
						{option}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default FormFood;
