import { MenuItem, ListItemIcon, Divider } from "@mui/material";
import { Store, Grading } from "@mui/icons-material";
import MenuItemsCustomer from "./MenuItemsCustomer";

function MenuItemsSeller() {
	return (
		<>
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

export default MenuItemsSeller;
