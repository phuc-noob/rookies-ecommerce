import { Chip, Collapse, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../helpers/context/OrdersContext";
import Loadding from "../layout/Loadding";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import MenuOrder from "./MenuOrder";
const columns = [
	{ id: "id", label: "ID", minWidth: 20, format: (value) => `#${value}` },
	{ id: "fullname", label: "Customer", minWidth: 150, sortable: true },
	{ id: "address", label: "Address", minWidth: 150 },
	{
		id: "updatedAt",
		label: "Date",
		minWidth: 200,
		sortable: true,
		format: (value) => new Date(value).toLocaleString(),
	},
	{
		id: "totalPrice",
		label: "Total Price",
		minWidth: 170,
		sortable: true,
		format: (value) => value.toFixed(0),
	},
	{
		id: "status",
		label: "Status Order",
		minWidth: 170,
		format: (value) => {
			const listColor = {
				ORDERED: "warning",
				ACCEPTED: "success",
				REJECTED: "error",
			};
			return <Chip label={value} color={listColor[value]} />;
		},
	},
	{
		id: null,
		label: "Options",
		minWidth: 170,
		align: "right",
		format: (value) => <MenuOrder data={value} />,
	},
];

const columnsDetail = [
	{ id: "productName", label: "Product Name", minWidth: 150, sortable: true },
	{ id: "orderItemPrice", label: "Price", minWidth: 150, sortable: true },
	{ id: "amount", label: "Amount", minWidth: 150, sortable: true },
	{ id: "orderItemPrice", label: "Total Price", minWidth: 150, sortable: true },
];

function createData(pros, index) {
	const {
		id,
		status,
		updatedAt,
		totalPrice,
		customer: { firstName,lastName, phone, email, address },
		oderDetails,
	} = pros;
	return {
		id,
		status,
		totalPrice,
		updatedAt,
		firstName,
		lastName,
		phone,
		email,
		address,
		oderDetails,
	};
}
function DropRow({ children }) {
	const row = createData(children);
	console.log(row)
	const [sort, setSort] = useState({
		field: null,
		order: null,
	});
	const [open, setOpen] = useState(false);
	return (
		<>
			<TableRow
				hover
				role="checkbox"
				tabIndex={-1}
				key={row.id}
				sx={{ cursor: "pointer", "& > *": { borderBottom: "unset" } }}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>
				{columns.map((column) => {
					let value;
					if (column.id) {
						value = row[column.id];
						if(column.id==="fullname")
							value =row["firstName"] + " " + row["lastName"]
					} else value = row;
					return (
						<TableCell key={column.id} align={column.align}>
							 
							{column.format ? column.format(value) : value}
						</TableCell>
					);
				})}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box>
							<Typography variant="h6" gutterBottom component="div">
								Detail order
							</Typography>
							<Table aria-label="purchases">
								<TableHead>
									<TableRow>
										{columnsDetail.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.sortable ? (
													<TableSortLabel
														active={sort.field === column.id}
														direction={sort.order ? sort.order : "asc"}
														onClick={() =>
															setSort({
																field: column.id,
																order: sort.order === "asc" ? "desc" : "asc",
															})
														}
													>
														{column.label}
													</TableSortLabel>
												) : (
													column.label
												)}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{row ? row.oderDetails.map((row) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.id}
												sx={{ cursor: "pointer" }}
											>
												{columnsDetail.map((column) => {
													let value = row[column.id];
													if(column.id ==="productName")value=row["product"].productName									
													return (<TableCell key={column.id} align={column.align}>
														{column.format ? column.format(value) : value}
													</TableCell>)
												
												})}
											</TableRow>
										);
									}) : ""}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default function GridFoods() {
	const {
		loadListOrders,
		ordersState: { loading, data },
	} = useContext(OrdersContext);
	const [sort, setSort] = useState({
		field: null,
		order: null,
	});
	useEffect(() => {
		loadListOrders({ page: 0, size: 10 });

	}, []);

	let rows = [];
	if (loading) return <Loadding />;
	else {
		rows = data;
	}
	return (
		<>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell />

							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
										fontWeight: "bold",
										fontSize: "16px",
									}}
								>
									{column.sortable ? (
										<TableSortLabel
											active={sort.field === column.id}
											direction={sort.order ? sort.order : "asc"}
											onClick={() =>
												setSort({
													field: column.id,
													order: sort.order === "asc" ? "desc" : "asc",
												})
											}
										>
											{column.label}
										</TableSortLabel>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							<Loadding />
						) : (
							rows.map((e) => {
								return <DropRow>{e}</DropRow>;
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
