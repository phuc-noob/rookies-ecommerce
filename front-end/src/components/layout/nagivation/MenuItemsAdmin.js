import { MenuItem, ListItemIcon, Divider } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import MenuItemsCustomer from "./MenuItemsCustomer";
import MenuItemsSeller from "./MenuItemsSeller";
import { useNavigate } from "react-router-dom";

function MenuItemsAdmin() {
	const navigate = useNavigate();
	const handleGoAdmin = () => navigate("/admin");
	return (
		<>
			<MenuItem onClick={handleGoAdmin}>
				<ListItemIcon>
					<AdminPanelSettings fontSize="small" />
				</ListItemIcon>
				Go Admin
			</MenuItem>
			<Divider />
			<MenuItemsSeller />
			<Divider />
			<MenuItemsCustomer />
		</>
	);
}

export default MenuItemsAdmin;
