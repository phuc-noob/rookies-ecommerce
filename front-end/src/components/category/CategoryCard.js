import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styled from "@emotion/styled";

function CategoryCard()
{
    return (
        <WrapperCard>
        <Card >
          <CardActionArea>
            <CardMedia
            sx={{ p: 1 }}
              component="img"
              height="140"
              image="https://res.cloudinary.com/dk2peasgq/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1666201801/cld-sample-4.jpg"
              alt="green iguana"
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Category
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
export default CategoryCard ;