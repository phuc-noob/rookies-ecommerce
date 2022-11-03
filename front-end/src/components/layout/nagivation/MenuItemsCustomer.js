import { MenuItem, ListItemIcon } from "@mui/material";
import { Timeline } from "@mui/icons-material";
import { Store, Grading } from "@mui/icons-material";
function MenuItemsCustomer() {
	return (
		<>
			<MenuItem>
				<ListItemIcon>
					<Store fontSize="small" />
				</ListItemIcon>
				Your Order
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Timeline fontSize="small" />
				</ListItemIcon>
				History
			</MenuItem>
		</>
	);
}

export default MenuItemsCustomer;
