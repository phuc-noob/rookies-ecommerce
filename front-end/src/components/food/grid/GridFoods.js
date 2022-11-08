import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, TableSortLabel } from "@mui/material";
import Popover from "@mui/material/Popover";
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import { ProductService } from "../../../helpers/service/productService";
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
	const nagivate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	const [ ListProduct, setListProduct ] = React.useState([])
	const {productId,setProductId} =React.useContext(ProductContext)
	React.useEffect(() => {
		ProductService.getProduct().then(res => {
			setListProduct(res)
		})
	},[anchorEl])
	const handleUpdate = (id) => {
		return (e) => {
			
		};
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const cacelClick = () => {
		console.log("noooo")
		setAnchorEl(null)
	}
	const deleteClick = async () =>{
		ProductService.deleteProduct(productId).then(()=>{
			
			nagivate("/admin/foods")
		})
		setAnchorEl(null)
	}

	const editClick =(event)=>{
		setProductId(event.currentTarget.value)
		nagivate('/admin/foods/update/'+event.currentTarget.value)
	}

	const handleClick = (event) => {
		console.log(event.currentTarget.value)
		setProductId(event.currentTarget.value)
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	
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
													{column.format && typeof value === "number" 
														? column.format(value)
														: value
													}
												</TableCell>
											</>
										);
									})}
									<TableCell key="option" padding="checkbox" align="right">
										<ButtonGroup variant="text" aria-label="text button group">
											<Button value={row.productId} size="small" sx={{ color: "red" }} onClick={handleClick}>
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
											><Grid >

													<Button onClick={deleteClick}>Yes</Button>
													<Button onClick={cacelClick}>No</Button>
												</Grid>
											</Popover>
											<Button value={row.productId} onClick={editClick} sx={{ color: "green" }}>EDIT</Button>
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
