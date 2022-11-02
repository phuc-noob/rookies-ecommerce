import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { ProductContext } from "../../helpers/context/productContext";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CategoryService } from "../../helpers/service/categoryService";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from "@mui/material/List";;

const rating = [
    {
        point: 1
    },
    {
        point: 2
    },
    {
        point: 3
    },
    {
        point: 4
    }
]

export default function RatingFilter(pros) {
    const [checked, setChecked] = React.useState([1]);
    const [open, setOpen] = React.useState(true);
    const [categories, setCategory] = React.useState([])
    const { ProductFilter, ListProduct, loadProductFilter } = React.useContext(ProductContext)
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
        const filter = { 
            ...ProductFilter, 
            rating:event.target.value,
            page:0
        }
        loadProductFilter(filter)
    };

    React.useEffect(() => {
        CategoryService.getCategory().then(res => {
            setCategory(res)
            console.log(res)
        })
    }, [])

    return (
    
        <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItemButton
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <ListItemText>Rating</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {
                        rating.map((value) => {
                            return (
                                <>
                                    <ListItem
                                        key={value.cateId}
                                        secondaryAction={
                                            <FormControlLabel value={value.point} control={<Radio edge="end" />} />

                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemText >
                                                trên {value.point} sao
                                            </ListItemText>

                                        </ListItemButton>
                                    </ListItem>
                                </>
                            );
                        })
                    }


                </RadioGroup>
            </Collapse>

            
        
        </List>
    )
} 