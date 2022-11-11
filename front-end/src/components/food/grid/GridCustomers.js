import * as React from "react";
import Popover from "@mui/material/Popover";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, TableSortLabel } from "@mui/material";
import Button from '@mui/material/Button';
import { CustomersService } from "../../../helpers/service/customerService";
import moment from 'moment';
import { useContext } from "react";
import { AuthContext } from "../../../helpers/context/authContext";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const columns = [
	{ id: "id", label: "ID" },
	{ id: "firstName", label: "First\u00a0Name", minWidth: 70, sortable: true, align: "right" },
	{
		id: "lastName",
		label: "Last Name",
		align: "right",
		format: (value) => (value ? "Available" : "Sold Out"),
	},
	{
		id: "phone",
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
	},
	{
		id: "options",
		label: "Options",
		align: "center",
		sortable: true,
	}
];

export default function GridsCustomers() {
	const [ListCustomers, setListCustomer] = React.useState([]);
	const {customerId,setCustomerId} = useContext(AuthContext)
	const nagivate = useNavigate()
	const [page, setPage] = React.useState(0)
	const MaxPage = 5;
	const [sort, setSort] = React.useState({
		field: null,
		order: null,
	});

	const [anchorEl, setAnchorEl] = React.useState(null);
	const paginCustomer = (e, page) => {
		CustomersService.getListCustomers(page-1).then(res=>{
			setListCustomer(res)
		})
		console.log(page)
	}

	const handleClick = (event) => {
		setCustomerId(event.currentTarget.value)
		setAnchorEl(event.currentTarget);
	};

	const editClick = async (event)=>{
		const setId = async () =>{
			setCustomerId(event.currentTarget.value)
			const cusId = event.currentTarget.value;
			nagivate(`/admin/customers/update/${cusId}`)
		}
		setId()
	}
	

	const handleClose = () => {
		setAnchorEl(null);
	};

	const cacelClick = () => {
		console.log("noooo")
		setAnchorEl(null)
	}
	const deleteClick = async () =>{
		CustomersService.deleteCustomerById(customerId).then(res =>{
			CustomersService.getListCustomers().then(res => {
				setListCustomer(res)
			})
		})
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	React.useEffect(() => {
		CustomersService.getListCustomers(page).then(res => {
			setListCustomer(res)
		})
	}, [])


	const handleUpdate = () => {
		
	};
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
								<>
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.productId}
										sx={{ cursor: "pointer" }}
										onClick={handleUpdate}
									>
										{columns.map((column) => {
											const value = row[column.id];

											return (

												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number" 
														? column.format(value)
														: value
													}
													{
														column.id === "options" ? (
															<Grid container direction="row" variant="text" aria-label="text button group">
																<div>
																	<Button value={row.id} size="small" sx={{ color: "red" }} onClick={handleClick}>
																		DELETE
																	</Button>
																	<Popover
																		id={id}
																		open={open}
																		anchorEl={anchorEl}
																		onClose={handleClose}
																		anchorOrigin={{
																			vertical: "bottom",
																			horizontal: "left"
																		}}
																	>
																		<Grid >

																			<Button onClick={deleteClick}>Yes</Button>
																			<Button onClick={cacelClick}>No</Button>
																		</Grid>
																	</Popover>
																</div>
																<Button value={row.id} onClick={editClick} size="small" sx={{ color: "green" }}>EDIT</Button>
															</Grid>
														) : ""
													}

												</TableCell>


											);
										})}

									</TableRow>
								</>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container justifyContent={"end"}>
				<Pagination
					page={page}
					onChange={paginCustomer}
					count={MaxPage}
				/>
			</Grid>
			
		</>
	);
}
