import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../../helpers/context/authContext';
import { RatingService } from '../../helpers/service/ratingService';
import { ProductContext } from '../../helpers/context/productContext';

import {
    FormControl,
    Grid,
    Typography,
    Button,
    TextField
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
const initFood = {
    point: 0,
    content: ""
};
export default function RatingCard() {
    const { authState: { user },
    } = React.useContext(AuthContext);
    const [stateForm, setStateForm] = React.useState(initFood);
    const {productId} =React.useContext(ProductContext)
    const nagivate =useNavigate()
    const ratingChange=(event,value)=>{
        console.log(value)
        setStateForm((pre) => {
            return {
                ...pre,
                point: value,
            };
        });
    }

    const ratingSubmit =()=>{
        console.log(productId)
        localStorage.setItem("productId",productId)
        
        RatingService.saveRating({...stateForm,customerDtoId:user.customerId,productDtoId:productId}).then(res=>{
            console.log(res)
            nagivate("/foods/"+productId)
        })
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
                spacing={3}
                sx={{ minHeight: "350px", border: 1, borderRadius: 5, paddingY: 1, borderColor: "#E5E3E2" }}
            >

                <Stack spacing={1} sx={{ paddingX: 10, paddingTop: 5, my: 0.5, minWidth: "1030px" }} >
                    <Typography sx={{ mr: 1, my: 0.5, minWidth: "130px" }}>
                        <strong>Account Info </strong>
                    </Typography>
                    <TextField
                        disabled
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue={user?user.firstName:""}
                        value= {user?user.firstName:""+" "+user.lastName!==null?user.lastName:""}
                    />
                    <Typography sx={{ mr: 1, my: 0.5, minWidth: "130px" }}>
                        <strong>Rating Point</strong>
                    </Typography>
                    <Rating precision={0.5} name="size-large" defaultValue={2} size="large" onChange={ratingChange} />
                    <FormControl
                        sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                        <Typography sx={{ mr: 1, my: 0.5, minWidth: "130px" }}>
                            <strong>Review</strong>
                        </Typography>
                        <TextField
                            multiline
                            required
                            size="small"
                            fullWidth
                            rows={10}
                            name="content"
                            onChange={handleChangeText}
                            value={stateForm.content}
                        />
                    </FormControl>
                    <br />
                    <Button onClick={ratingSubmit} variant="contained">Submit</Button>
                </Stack>

            </Grid>
        </>
    );
}