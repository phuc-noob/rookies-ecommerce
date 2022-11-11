import {
	CheckCircleOutline,
	HighlightOffOutlined,
	MoreVert,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { OrdersContext } from "../../helpers/context/OrdersContext";
import Loadding from "../layout/Loadding";

function MenuOrder({ data }) {
	const {
		ordersState: {
			action: { id, loading },
		},
		acceptOrder,
		rejectOrder,
	} = useContext(OrdersContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleAccept = () => {
		handleClose();
		acceptOrder(data.id);
	};
	const handleReject = () => {
		handleClose();
		rejectOrder(data.id);
	};
	if (id === data.id && loading) {
		console.log("loadding");
		return <Loadding />;
	}
	if (data.statusOrder !== "ORDERED") {
		return null;
	}
	return (
		<>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						width: "20ch",
					},
				}}
			>
				<MenuItem onClick={handleAccept} disableRipple>
					<CheckCircleOutline color="success" sx={{ mr: 2 }} />
					Accept order
				</MenuItem>
				<MenuItem onClick={handleReject} disableRipple>
					<HighlightOffOutlined color="error" sx={{ mr: 2 }} />
					Reject order
				</MenuItem>
			</Menu>
		</>
	);
}

export default MenuOrder;
