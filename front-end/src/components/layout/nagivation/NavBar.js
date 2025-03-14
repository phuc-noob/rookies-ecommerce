import React, { useContext, useEffect, useState } from "react";
import { CardGiftcard } from "@mui/icons-material";
import { AuthContext } from "../../../helpers/context/AuthContext";
import {
	AppBar,
	Button,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Badge,
	Tabs,
	Tab,
	Container,
} from "@mui/material";
import { FastfoodRounded } from "@mui/icons-material";
import ButtonUser from "./ButtonUser";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../helpers/context/orderContext";

function NavBar() {
	const { CartQuantity } = useContext(OrderContext)
	const navigation = useNavigate()
	const foodIconClick = () => {
		navigation("/")
	}

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const cartIconClick = () => {
		navigation("/carts/my")
		window.location.reload(false);
	}

	return (
		<AppBar color={"transparent"} position="fixed" sx={{ zIndex: "50", background: "#FFFFFF" }}>
			<Container >
				<Toolbar
					sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}
				>
					<Typography  variant="h6" component="div" sx={{ width: '300px' }}>
						<strong>SportZone Stores</strong>
					</Typography>
					<Box  sx={{ width: '100%', bgcolor: 'background.paper' }}>
						<Tabs value={value} onChange={handleChange} centered>
							<Tab sx={{ fontWeight: 'bold' }} label="Ao Bong Da" />
							<Tab sx={{ fontWeight: 'bold' }} label="Do Tap Gym" />
							<Tab sx={{ fontWeight: 'bold' }} label="Giay Bong Da" />
							<Tab sx={{ fontWeight: 'bold' }} label="Ao Bong Chuyen" />
							<Tab sx={{ fontWeight: 'bold' }} label="Ao Cau Long" />
						</Tabs>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ width: '330px' }}>
						<IconButton
							size="large"
							aria-label="show new order"
							color="inherit"
							sx={{
								borderRadius: "12px",
								borderColor: "'error.main'",
								border: 1,
								mx: 1,
							}}
							onClick={cartIconClick}
						>
							<Badge badgeContent={CartQuantity} color="error" >
								<CardGiftcard />
							</Badge>
						</IconButton>
						<ButtonUser />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default NavBar;
