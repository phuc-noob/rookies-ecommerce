import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, Pagination, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import ButtonGroup from '@mui/material/ButtonGroup';
import { ProductContext } from "../../../helpers/context/productContext";
const columns = [
	{ id: "productId", label: "ID", minWidth: 20, align: "right" },
	{ id: "productName", label: "Food\u00a0Name", minWidth: 170, sortable: true, align: "right" },
	{
		id: "status",
		label: "Status",
		minWidth: 100,
		align: "right",
		format: (value) => (value ? "Available" : "Sold Out"),
	},
	{
		id: "totalSold",
		label: "Total Sold",
		minWidth: 130,
		sortable: true,
		align: "right",
	},
	{
		id: "createdAt",
		label: "Created At",
		minWidth: 250,
		sortable: true,
		align: "right",
		format: (params) => dayjs(params).format()
	},
	{
		id: "description",
		label: "Description",
		minWidth: 170,
		sortable: true,
		align: "right",
	},
	{
		id: "price",
		label: "Price",
		minWidth: 170,
		align: "right",
		sortable: true,
		format: (value) => value.toFixed(2),
	}
];

export default function GridFoods() {
	const [sort, setSort] = React.useState({
		field: null,
		order: null,
	});
	const { ListProduct } = React.useContext(ProductContext)
	console.log(ListProduct)
	const handleUpdate = (id) => {
		return (e) => {
			setOpen(true);
		};
	};
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<TableContainer sx={{ maxHeight: 700 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
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
						{ListProduct.map((row) => {
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.productId}
									sx={{ cursor: "pointer" }}
									onClick={handleUpdate(row.productId)}
								>
									{columns.map((column) => {
										const value = row[column.id];

										return (
											<>
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number" || typeof value === "datetime"
														? column.format(value)
														: value
													}
												</TableCell>
											</>
										);
									})}
									<TableCell key="option" padding="checkbox" align="right">
										<ButtonGroup variant="text" aria-label="text button group">
											<Button sx={{ color: "red" }}>DELETE</Button>
											<Button sx={{ color: "green" }}>EDIT</Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>

							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={ListProduct.length + 1}
				rowsPerPage={5}
				page={1}
				rowsPerPageOptions={[]}
			/>
		</>
	);
}
