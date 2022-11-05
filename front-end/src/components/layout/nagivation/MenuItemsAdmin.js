import { MenuItem, ListItemIcon, Divider } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import MenuItemsCustomer from "./MenuItemsCustomer";
import { Store, Grading } from "@mui/icons-material";
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
	
			<MenuItem>
				<ListItemIcon>
					<Store fontSize="small" />
				</ListItemIcon>
				Your store
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Grading fontSize="small" />
				</ListItemIcon>
				Pedding order
			</MenuItem>
			<Divider />
			<MenuItemsCustomer />
		</>
	);
}

export default MenuItemsAdmin;
