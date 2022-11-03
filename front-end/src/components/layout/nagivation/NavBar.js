import { useContext, useEffect, useState } from "react";
import { CardGiftcard } from "@mui/icons-material";
import { AuthContext } from "../../../helpers/context/authContext";
import {
	AppBar,
	Button,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Badge,
	Container,
} from "@mui/material";
import { FastfoodRounded } from "@mui/icons-material";
import ButtonUser from "./ButtonUser";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../helpers/context/orderContext";

function NavBar() {
	const {CartQuantity} = useContext(OrderContext)
	const navigation = useNavigate()
	const foodIconClick =()=>{
		navigation("/")
	}

	const cartIconClick =() =>{
		navigation("/carts/my")
		window.location.reload(false);
	}

	return (
		<AppBar color={"transparent"} position="fixed" sx={{ zIndex: "10" }}>
			<Container >
				<Toolbar
					sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}
				>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={foodIconClick}
					>
						<FastfoodRounded />
					</IconButton>
					<Typography variant="h6" component="div" sx={{}}>
						GoodFood
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box >
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
