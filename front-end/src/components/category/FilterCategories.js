import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Badge, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CategoryService } from "../../helpers/service/categoryService";
import FilterItem from "./FilterItem";
import RatingFilter from "./RatingFiller";

import { ProductContext } from "../../helpers/context/productContext";

export default function FilterCategories() {
	const [checked, setChecked] = React.useState([1]);
	const [open, setOpen] = React.useState(true);
	const [categories, setCategory] = React.useState([])
	const {ProductFilter,ListProduct,loadProductFilter} = React.useContext(ProductContext)

	React.useEffect(() => {
		CategoryService.getCategory(0).then(res => {
			setCategory(res)
		})
	}, [])

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		
		if (currentIndex === -1) {
			newChecked.push(value);
			const arr = ProductFilter.category;
			arr.push(value)
			
			const filter = {...ProductFilter,category:arr}
			loadProductFilter(filter)

		} else {
			const arr = ProductFilter.category;
			if(arr.includes(value)){          
				arr.splice(arr.indexOf(value), 1);             
			}
			const filter = {...ProductFilter,category:arr}
			loadProductFilter(filter)
			newChecked.splice(currentIndex, 1);
			console.log("f")
		}
		setChecked(newChecked);
	};

	return (
		<List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
			<ListItemButton
				onClick={() => {
					setOpen(!open);
				}}
			>
				<ListItemText>Categories</ListItemText>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{categories.map((value) => {
					const labelId = `checkbox-list-secondary-label-${value.cateName}`;
					return (
						<>
							<ListItem
								key={value.cateId}
								secondaryAction={
									<Checkbox
										edge="end"
										onChange={handleToggle(value.cateId)}
										checked={checked.indexOf(value.cateId) !== -1}
										inputProps={{ "aria-labelledby": labelId }}
									/>
								}
							>
								<ListItemButton>
									<ListItemText id={labelId}>
										{value.cateName}
										<Badge
											badgeContent={value.amount}
											color="error"
											sx={{ ml: 2 }}
										></Badge>
									</ListItemText>
								</ListItemButton>
							</ListItem>
						</>
					);
				})}
			</Collapse>
			<FilterItem />
			<RatingFilter />
		</List>
	);
}
