import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/context/authContext";
import {
	Button,
	Box,
	Menu,
	MenuItem,
	Divider,
	Avatar,
	ListItemIcon,
	IconButton,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import MenuItemsCustomer from "./MenuItemsCustomer";
import MenuItemsSeller from "./MenuItemsSeller";
import MenuItemsAdmin from "./MenuItemsAdmin";
function ButtonUser() {
	const {
		authState: { isAuthenticated, user, authorization },
		logout,
	} = useContext(AuthContext);
	let OptionMenu = null;

	switch (authorization) {
		case "admin":
			OptionMenu = <MenuItemsAdmin />;

			// OptionMenu = <MenuItemsCustomer />;
			break;
		case "seller":
			OptionMenu = <MenuItemsSeller />;
			break;
		default:
			OptionMenu = <MenuItemsCustomer />;
			break;
	}
	OptionMenu = <MenuItemsAdmin />;

	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
	};
	const handleLogin = () => navigate("/login");

	return (
		<>
			{isAuthenticated ? (
				<>
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
						onClick={handleClick}
					>
						<Avatar
							sx={{
								width: "24px",
								height: "24px",
								background: "transparent",
								color: "black",
							}}
						/>
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={Boolean(anchorEl)}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem>
							<Avatar /> Welcome, {user.username}!
						</MenuItem>

						<Divider />
						{OptionMenu}
						<Divider />

						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</>
			) : (
				<Button
					onClick={handleLogin}
					color="inherit"
					sx={{
						borderRadius: "12px",
						borderColor: "'error.main'",
						border: 1,
						py: "12px",
						mx: 1,
					}}
				>
					Login/Sign up
				</Button>
			)}
		</>
	);
}

export default ButtonUser;
