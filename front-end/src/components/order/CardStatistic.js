import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
function CardStatistic({ title, data, description }) {
	return (
		<>
			<Card sx={{ minHeight: 150 }}>
				<CardContent>
					<Grid container justifyContent={"center"} direction="column">
						<Typography
							sx={{ fontSize: 16 }}
							color="text.secondary"
							gutterBottom
							justifyContent={"center"}
						>
							{title}
						</Typography>
						<Divider sx={{ mb: 2, borderColor: "grey.500" }} />
						<Typography variant="h2" sx={{ fontWeight: "bold" }}>
							{data}
						</Typography>

						<Typography variant="body2">{description}</Typography>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default CardStatistic;
