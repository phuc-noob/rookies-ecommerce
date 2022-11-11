import * as React from "react";
import Popover from "@mui/material/Popover";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { CategoryService } from "../../../helpers/service/categoryService";
import { ProductContext } from "../../../helpers/context/productContext";
import moment from 'moment';
import { Pagination } from "@mui/material";

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
	},
	{
		id: "options",
		label: "Options",
		align: "center",
		sortable: true,
	}
];

export default function Gridcategories() {
	const {categoryId,setCategoryId} = React.useContext(ProductContext)
    const [listCategories,setListCategories] = React.useState([])
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [page, setPage] = React.useState(0)
	const MaxPage = 5;
	const nagivate = useNavigate()
	const [sort, setSort] = React.useState({
		field: null,
		order: null,
	});

	const paginCategory = (e, page) => {
		CategoryService.getListCategories(page-1).then(res =>{
			setListCategories(res)

			console.log(res)
		})
		console.log(page)
	}

	const { ListProduct } = React.useContext(ProductContext)

    React.useEffect(() => {
        CategoryService.getListCategories(0).then(res => {
            setListCategories(res)
        })
    },[anchorEl])

    const handleClick = (event) => {
		console.log(event.currentTarget.value)
		setCategoryId(event.currentTarget.value)
		setAnchorEl(event.currentTarget);
	};

	const editClick = async (event)=>{
		const setId = async () =>{
			setCategoryId(event.currentTarget.value)
			const cateId = event.currentTarget.value
			nagivate(`/admin/categories/update/${cateId}`)
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
		console.log(categoryId)
		CategoryService.deleteCategory(categoryId).then(()=>{
			nagivate("/admin/categories")
		})
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	React.useEffect(() => {
		
	}, [])


   
	const handleUpdate = (id) => {
		
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
														column.id === "options" ? (
															<Grid container direction="row" variant="text" aria-label="text button group">
																<div>
																	<Button value={row.cateId} size="small" sx={{ color: "red" }} onClick={handleClick}>
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
																<Button value={row.cateId} onClick={editClick} size="small" sx={{ color: "green" }}>EDIT</Button>
															</Grid>
														) : ""
													}

											</TableCell>
										);
									})}
									
								</TableRow>

							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container justifyContent={"end"}>
				<Pagination
					page={page}
					onChange={paginCategory}
					count={MaxPage}
				/>
			</Grid>
		</>
	);
}
