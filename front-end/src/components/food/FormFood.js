import {
	FormControl,
	Grid,
	Typography,
	Button,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../helpers/context/productContext";
import UploadMultipleImages from "../form/UploadMultipleImages";
import { Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CategoryService } from "../../helpers/service/categoryService";
import { ImageUtil } from "../../helpers/util/uploadImage";
import { ProductService } from "../../helpers/service/productService";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const initFood = {
	productName: "",
	description: "",
	status: true,
	price: 0,
	categoryIds: [],
	amount: 0,
	imageDtos: []
};



function FormFood() {
	const [stateForm, setStateForm] = useState(initFood);
	const [imageURLs, setImageURLs] = useState([]);
	const [dataCategories, setDataCategories] = useState([])
	const { ListImages } = useContext(ProductContext)
	const nagivate = useNavigate()

	useEffect(() => {

		CategoryService.getListCategories().then(res => {
			setDataCategories(res)
		})
	}, [])

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	async function handleButtonClick() {
		setLoading(true)
		uploadIamge()
	};
	
	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			"&:hover": {
				bgcolor: green[700]
			}
		})
	};


	const handleChange = async (e, value) => {
		console.log(value)
		const cates = []
		value.map(e => { cates.push(e.cateId) })
		console.log(cates)
		setStateForm((pre) => {
			return {
				...pre,
				categoryIds: cates,
			};
		});

	}
	async function uploadIamge() {
		console.log(ListImages)
		setLoading(true)
		let result = ListImages?.map(async files => {
			
			const imageOj = { imageURL: "" }
			const temp = await ImageUtil.uploadImage(files)
			return {...imageOj,imageURL:temp.url}
		})
		Promise.all(result).then((e)=>{
			setLoading(false)
			console.log(e)
			ProductService.saveProduct({...stateForm,imageDtos:e}).then(res =>{
				console.log(res)
				nagivate('/admin/foods')
			})
		})
		setLoading(false)
	}

	const handleChangeText = (e) => {
		setStateForm((pre) => {
			return {
				...pre,
				[e.target.name]: e.target.value,
			};
		});
	};

	return (
		<>
			<Grid
				container
				spacing={2}
				sx={{ minHeight: "350px", border: 1, paddingY: 5, borderColor: "#979793", borderRadius: 3 }}
				component={"form"}
			>
				<Grid item lg={7} md={7}>
					<Grid container direction="column" gap={2} sx={{ pr: 2 }}>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Food name:</strong>
							</Typography>
							<TextField
								size="small"
								required
								fullWidth
								name="productName"
								onChange={handleChangeText}
								value={stateForm.food_name}
							/>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
							required
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Description:</strong>
							</Typography>
							<TextField
								size="small"
								name="description"
								multiline
								maxRows={5}
								fullWidth
								onChange={handleChangeText}
								value={stateForm.description}
							/>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Category:</strong>
							</Typography>
							<Autocomplete
								name="categories"
								onChange={handleChange}
								multiple
								options={dataCategories}
								disableCloseOnSelect
								limitTags={2}
								getOptionLabel={(option) => option.cateName}
								key={(option) => option.id}

								renderOption={(props, option, { selected }) => (
									<li {...props}>
										<Checkbox
											icon={icon}
											checkedIcon={checkedIcon}
											style={{ marginRight: 8 }}
											checked={selected}
										/>
										{option.cateName}
									</li>
								)}
								renderInput={(params) => (
									<>
										<TextField
											{...params}
											placeholder="Categories"
											maxRows={2}
											id="autocomplete-select-categories"
											variant="standard"
										/>
									</>
								)}
								fullWidth
								sx={{ border: 0 }}
							/>
						</FormControl>

						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Status:</strong>
							</Typography>

							<Select
								labelId="demo-simple-select-standard-label"
								name="status"
								size="small"
								value={stateForm.status}
								onChange={handleChangeText}
								placeholder="Status"

							>
								<MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
								<MenuItem value={"DELETED"}>DELETED</MenuItem>
								<MenuItem value={"LIMIT"}>LIMIT</MenuItem>
								<MenuItem value={"CLOSE"}>CLOSE</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Price:</strong>
							</Typography>

							<TextField
								size="small"
								type={"number"}
								sx={{ width: 115 }}
								required
								name="price"
								onChange={handleChangeText}
								value={stateForm.money}
							/>
							<Typography sx={{ paddingX: 1, mr: 1, my: 1, minWidth: "115px" }}>
								<strong >VNĐ</strong>
							</Typography>
						</FormControl>
						<FormControl
							sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
						>
							<Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
								<strong>Amount:</strong>
							</Typography>

							<TextField
								size="small"
								type={"number"}
								sx={{ width: 115 }}
								required
								name="amount"
								onChange={handleChangeText}
								value={stateForm.amount}
							/>
						</FormControl>
						<FormControl sx={{ flexDirection: "row", gap: 2 }} fullWidth>
							<Button type={"submit"} variant="outlined" color="inherit">
								Cancel
							</Button>
							<Button
								sx={buttonSx}
								disabled={loading}
								onClick={handleButtonClick}
							>
								Save
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									sx={{
										color: green[500],
										position: "absolute",
										top: "50%",
										left: "50%",
										marginTop: "-12px",
										marginLeft: "-12px"
									}}
								/>
							)}
						</FormControl>
					</Grid>
				</Grid>
				<Grid item lg={5} md={5} sx={{ border: 0, borderRadius: "16px", borderColor: "#5F795C" }}>
					<UploadMultipleImages value={imageURLs} setState={setImageURLs} />
				</Grid>
			</Grid>
		</>
	);
}

export default FormFood;
