import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { 
	Grid,
	Toolbar,
	Typography, } from "@mui/material";
import { Divider } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { FastfoodRounded } from "@mui/icons-material";
import { color } from "@mui/system";

const drawerWidth = 240;

export default function HomeAdminPage() {
	const nagivate = useNavigate();
	const handleClickMenu = () => {
		nagivate("/admin/foods");
	};

	const handleClickCustomers = () => {
		nagivate("/admin/customers")
	}

	const foodIconClick =()=>{
		nagivate("/")
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
						
						<ListItemButton onClick={handleClickMenu}>
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

					</Grid>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "75px" }}>
				<Outlet />
			</Box>
		</Box>
	);
}
