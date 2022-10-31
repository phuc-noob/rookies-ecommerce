import * as React from "react";
import { Autocomplete, Checkbox, TextField, FormControl } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataCategories = [
	{
		id: 1,
		category_name: "Oliver Hansen",
	},
	{
		id: 2,
		category_name: "Van Henry",
	},
	{
		id: 3,
		category_name: "April Tucker",
	},
	{
		id: 4,
		category_name: "Ralph Hubbard",
	},
	{
		id: 5,
		category_name: "Oliver Hansen5",
	},
	{
		id: 6,
		category_name: "Oliver Hanse6n",
	},
	{
		id: 7,
		category_name: "Oliver Hanse7n",
	},
	{
		id: 8,
		category_name: "Oliver Hans8en",
	},
];

export default function SelectCategories({ value, setState }) {
	return (
		<>
			<Autocomplete
				name="categories"
				onChange={(e, value) => {
					setState(value);
				}}
				multiple
				options={dataCategories}
				disableCloseOnSelect
				limitTags={2}
				getOptionLabel={(option) => option.category_name}
				key={(option) => option.id}
				value={value}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{option.category_name}
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
		</>
	);
}
