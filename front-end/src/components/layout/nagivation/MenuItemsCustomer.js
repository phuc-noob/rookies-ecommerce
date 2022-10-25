import { MenuItem, ListItemIcon } from "@mui/material";
import { Timeline } from "@mui/icons-material";
function MenuItemsCustomer() {
	return (
		<>
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
