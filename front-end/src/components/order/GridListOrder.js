import { Chip, Collapse, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../helpers/context/OrdersContext";
import Loading from "../layout/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
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
		id: "createAt",
		label: "Date",
		minWidth: 170,
		sortable: true,
		format: (value) => new Date(value).toLocaleString(),
	},
	{
		id: "totalPrice",
		label: "Amout",
		minWidth: 170,
		sortable: true,
		format: (value) => `${value.toFixed(0)} VND`,
	},
	{
		id: "statusOrder",
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
		label: "",
		minWidth: 170,
		align: "right",
		format: (value) => <MenuOrder data={value} />,
	},
];

const columnsDetail = [
	{ id: "productName", label: "Product Name", minWidth: 150, sortable: true },
	{ id: "price", label: "Price", minWidth: 150, sortable: true },
	{ id: "amount", label: "Amount", minWidth: 150, sortable: true },
	{ id: "totalPrice", label: "Total Price", minWidth: 150, sortable: true },
];

function createData(pros, index) {
	const {
		id,
		statusOrder,
		createAt,
		totalPrice,
		customer: { fullname, phone, email, address },
		orderDetails,
	} = pros;
	return {
		id,
		statusOrder,
		totalPrice,
		createAt,
		fullname,
		phone,
		email,
		address,
		orderDetails,
	};
}
function DropRow({ children }) {
	const row = children;

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
									{row.orderDetails.map((row) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.id}
												sx={{ cursor: "pointer" }}
											>
												{columnsDetail.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format ? column.format(value) : value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
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
	if (loading) return <Loading />;
	else {
		rows = data.map(createData);
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
							<Loading />
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
