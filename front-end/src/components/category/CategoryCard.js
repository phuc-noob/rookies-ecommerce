import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea } from '@mui/material';
import styled from "@emotion/styled";
import {useNavigate } from "react-router-dom";
import {CategoryService} from "../../helpers/service/categoryService"
import { useContext } from "react";
import {ProductContext} from "../../helpers/context/productContext"
function CategoryCard(category) {
    const {ListProduct ,loadListProductByCate} = useContext(ProductContext)
    const nagivation = useNavigate();
    const onCategoryClick = async ()=>{
        console.log(category.cateId)
        loadListProductByCate(category.cateId)
        console.log(ListProduct)
        nagivation("/foods")
    }

    return (
        <WrapperCard>
            <Card onClick={onCategoryClick}>
                <CardActionArea>
                    <CardMedia
                        sx={{ p: 1 }}
                        component="img"
                        height="140"
                        image={category.image}
                        alt="green iguana"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {category.cateName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </WrapperCard>
    );
}
const WrapperCard = styled.div`
	&:hover {
		transform: scale(1.02);
	}
`;
export default CategoryCard;