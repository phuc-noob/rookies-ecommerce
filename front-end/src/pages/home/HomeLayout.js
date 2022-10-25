import { Grid } from "@mui/material";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/nagivation/NavBar";
import { Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
function HomeLayout() {
	return (
		<Grid
			container
			direction="column"
		>
			<Navbar />
			<Outlet />
			<Divider sx={{ my: 8, borderBottom: 2 }} />
			<Footer />
		</Grid>
	);
}

export default HomeLayout;
