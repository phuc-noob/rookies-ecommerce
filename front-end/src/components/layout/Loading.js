import { Grid, CircularProgress } from "@mui/material";

function Loading() {
	return (
		<Grid
			container
			justifyContent={"center"}
			sx={{
				my: "2rem",
			}}
		>
			<CircularProgress color="info" size={60} thickness={5} />
		</Grid>
	);
}

export default Loading;
