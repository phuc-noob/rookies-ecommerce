import { MenuItem, ListItemIcon } from "@mui/material";
import { Timeline } from "@mui/icons-material";
import { Store, Grading } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function MenuItemsCustomer() {

	const navigate =useNavigate()
	const orderClick =()=>{
		navigate('/orders/history')
	}
	return (
		<>
			<MenuItem onClick={orderClick}>
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
