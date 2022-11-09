import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import { CustomersService } from "../../helpers/service/customerService";

export default function RatingItem(Product) {
    console.log(Product.value)
    const [customer,setCustomer] =React.useState({})
    React.useEffect(()=>{
        CustomersService.getCustomerById(Product.value.customerId).then(res=>{
            setCustomer(res)
        })
    },[])
    return (
        <Card className="OrderItem" sx={{ border: 0.5, borderColor: "#EBE7F3", display: "flex", marginTop: 0.5, justifyContent: 'space-between' }}>

            <Box sx={{ display: "flex" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                        {customer.firstName} {customer.lastName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                       {Product.value.content}
                    </Typography>

                </CardContent>

            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    "& > *": {
                        m: 1
                    },
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        "& > *": {
                            m: 1
                        },
                        alignItems: "center"
                    }}
                >
                    <Rating name="half-rating-read" value={Product.value.point} precision={0.5} readOnly />
                    <label>{Product.value.createdAt}</label>
                </Box>
                
                <label></label>
            </Box>

        </Card>
    );
}
