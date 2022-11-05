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
import { ProductContext } from "../../../helpers/context/productContext";
import { CategoryService } from "../../../helpers/service/categoryService";
import moment from 'moment';
const columns = [
	{ id: "cateId", label: "ID", minWidth: 20 },
	{ id: "cateName", label: "Categories Name", minWidth: 150, sortable: true },
	{
		id: "description",
		label: "Description",
		minWidth: 170,
		sortable: true,
		align: "right",
	},
	{
		id: "amount",
		label: "Total Product",
		minWidth: 170,
		align: "right",
		sortable: true,
		format: (value) => value.toFixed(0),
	},
    {
		id: "createdAt",
		label: "Created At",
		minWidth: 250,
		sortable: true,
		align: "right",
		valueFormatter: params =>
			moment(params?.value).format("DD/MM/YYYY"),
	}
];

export default function Gridcategories() {
    const [listCategories,setListCategories] = React.useState([])
	const [sort, setSort] = React.useState({
		field: null,
		order: null,
	});
	const { ListProduct } = React.useContext(ProductContext)

    React.useEffect(() => {
        CategoryService.getListCategories().then(res => {
            setListCategories(res)
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
						{listCategories.map((row) => {
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
											<Button sx ={{color:"red"}}>DELETE</Button>
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
				count={ListProduct.length + 1}
				rowsPerPage={5}
				page={1}
				rowsPerPageOptions={[]}
			/>
		</>
	);
}
