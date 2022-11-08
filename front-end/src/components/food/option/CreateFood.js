import { FormControl, Button } from "@mui/material";

function CreateFood({ value, onReset, onClose }) {
	const handleSubmitAndContinue = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<FormControl sx={{ flexDirection: "row", gap: 2 }} fullWidth>
				<Button type={"submit"} variant="outlined" color="inherit">
					Cancel
				</Button>
				<Button type={"submit"} variant="outlined" color="inherit">
					Save
				</Button> 
			</FormControl>
		</>
	);
}

export default CreateFood;
