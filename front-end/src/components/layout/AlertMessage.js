import React from "react";
import { Alert } from "@mui/material";
const AlertMsg = (pros) => {
	return pros.show ? (
		<Alert sx={{ flexGrow: 1 }} severity={pros.type}>
			{pros.message}
		</Alert>
	) : null;
};

export default AlertMsg;
