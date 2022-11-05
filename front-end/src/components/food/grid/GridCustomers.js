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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CustomersService } from "../../../helpers/service/customerService";
import moment from 'moment';
import DeleteConfirm from "../dialog/DeleteConfirm";

const columns = [
	{ id: "id", label: "ID" },
	{ id: "firstName", label: "First\u00a0Name", minWidth: 70, sortable: true,align: "right" },
	{
		id: "lastName",
		label: "Last Name",
		align: "right",
		format: (value) => (value ? "Available" : "Sold Out"),
	},
	{
		id: "Phone",
		label: "Phone",
		sortable: true,
		align: "right",
	},
    {
		id: "email",
		label: "Email",
		sortable: true,
		align: "right",
	},
	{
		id: "createdAt",
		label: "Created At",
		sortable: true,
		align: "right",
		valueFormatter: params =>
			moment(params?.value).format("DD/MM/YYYY"),
	},
	{
		id: "address",
		label: "Address",
		align: "right",
		sortable: true,
	},
    {
		id: "gender",
		label: "Gender",
		align: "right",
		sortable: true,
	},
	{
		id: "status",
		label: "Status",
		align: "right",
		sortable: true,
	}
];

export default function GridsCustomers() {
	const [ListCustomers,setListCustomer] = React.useState([]);
    const [sort, setSort] = React.useState({
		field: null,
		order: null,
	});
	
    React.useEffect(() => {
        CustomersService.getListCustomers().then(res => {
            setListCustomer(res)
        })
    },[])

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
						{ListCustomers.map((row) => {
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
											<TableCell key={column.id} align={column.align}>
												{column.format && typeof value === "number" || typeof value === "datetime"
													? column.format(value)
													: value
												}
												{

												}
											</TableCell>
										);
									})}
									<TableCell padding="checkbox">
										<ButtonGroup variant="text" aria-label="text button group">
											<DeleteConfirm />
											<Button sx ={{color:"green"}}>EDIT</Button>
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
				count={ListCustomers.length + 1}
				rowsPerPage={5}
				page={1}
				rowsPerPageOptions={[]}
			/>
		</>
	);
}
