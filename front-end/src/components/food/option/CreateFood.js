import { FormControl, Button } from "@mui/material";

function CreateFood({ value, onReset, onClose }) {
	const handleSubmitAndContinue = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<FormControl sx={{ flexDirection: "row", gap: 2 }} fullWidth>
				<Button variant="outlined" color="inherit">
					Clear
				</Button>
				<Button type={"submit"} variant="outlined" color="inherit">
					Save and continue
				</Button>
				<Button type={"submit"} variant="outlined" color="inherit">
					Save
				</Button>
			</FormControl>
		</>
	);
}

export default CreateFood;
