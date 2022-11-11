import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CategoryService } from "../../helpers/service/categoryService";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ProductContext } from "../../helpers/context/productContext";
const price = [
    {
        index: 0,
        down: 0,
        top: 23000
    },
    {
        index: 1,
        down: 23000,
        top: 50000
    },
    {
        index: 2,
        down: 50000,
        top: 100000
    },
    {
        index: 3,
        down: 100000,
        top: 500000
    }
]

export default function FilterItem(pros) {
    const [open, setOpen] = React.useState(true);
    const [categories, setCategory] = React.useState([])
    const { ProductFilter, ListProduct, loadProductFilter } = React.useContext(ProductContext)
    const [value, setValue] = React.useState(price[0].index);

    const handleChange = async (event) => {
        setValue(event.target.value)
        const filter = { 
            ...ProductFilter, 
            price: price[event.target.value].down, 
            priceOn: price[event.target.value].top ,
            page:0
        }
        loadProductFilter(filter)
    };

    React.useEffect(() => {
        console.log(ProductFilter)
        CategoryService.getCategory(0).then(res => {
            setCategory(res)
        })
    }, [value])

    return (
        <>
            <ListItemButton
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <ListItemText>Price</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value.index}
                    onChange={handleChange}
                >
                    {
                        price.map((value) => {
                            return (
                                <>
                                    <ListItem
                                        key={value.cateId}
                                        secondaryAction={
                                            <FormControlLabel value={value.index} control={<Radio edge="end" />} />

                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemText >
                                                {value.down} - {value.top}
                                            </ListItemText>

                                        </ListItemButton>
                                    </ListItem>
                                </>
                            );
                        })
                    }
                </RadioGroup>
            </Collapse>
        </>
    )
} 
