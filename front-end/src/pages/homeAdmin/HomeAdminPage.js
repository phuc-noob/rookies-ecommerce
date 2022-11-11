import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import { Outlet, useNavigate } from "react-router-dom";
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { 
	Grid,
	Toolbar,
	} from "@mui/material";

import SellIcon from '@mui/icons-material/Sell';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

export default function HomeAdminPage() {
	const nagivate = useNavigate();
	const handleClickMenu = () => {
		nagivate("/admin/foods");
	};
	const handleClickHome =()=>{
		nagivate("/")
	}

	const handleClickCustomers = () => {
		nagivate("/admin/customers")
	}
	
	const handleClickOrder =()=>{
		nagivate("/admin/order")
	}

	const handleClickCategories = () => {
		nagivate("/admin/categories")
	}
	return (
		<Box sx={{ display: "flex" }} >
			<CssBaseline />
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				
				<Toolbar/>
				<br/>
				<label style={{color:"#E8EAE8"}}>- - - - - - - - - - - - - - - - - - - - - - - - </label>
				<Box >
					<Grid container direction={"row"}>
					
						<ListItemButton onClick={handleClickCategories}>
							<ListItemIcon>
								<MenuIcon />
							</ListItemIcon>
							<ListItemText primary={"Categories"} />
						</ListItemButton>
					
						<ListItemButton onClick={handleClickMenu}>
							<ListItemIcon>
								<LunchDiningIcon />
							</ListItemIcon>
							<ListItemText primary={"Products"} />
						</ListItemButton>
						
						<ListItemButton onClick={handleClickCustomers}>
							<ListItemIcon>
								<GroupIcon />
							</ListItemIcon>
							<ListItemText primary={"Customers"} />
						</ListItemButton>
						
						<ListItemButton onClick={handleClickOrder}>
							<ListItemIcon>
								<LocalMallIcon />
							</ListItemIcon>
							<ListItemText primary={"Orders"} />
						</ListItemButton>
						<ListItemButton onClick={handleClickMenu}>
							<ListItemIcon>
								<SellIcon />
							</ListItemIcon>
							<ListItemText primary={"Vouchers"} />
						</ListItemButton>
						<ListItemButton onClick={handleClickHome}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={"Go To Home Page"} />
						</ListItemButton>

					</Grid>
					
				</Box>
				
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "75px" }}>
				<Outlet />
				
			</Box>
		</Box>
	);
}
