import * as React from "react";
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductService } from "../../helpers/service/productService";
import { OrderContext } from "../../helpers/context/orderContext";

export default function OrderItemInfo(pros) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [Product, setProduct] = React.useState()
    const [checked, setChecked] = React.useState([1]);
    const {TotalBill,setTotalBill,ListCartOrderPending,setCartOrderPending} = React.useContext(OrderContext)
    React.useEffect(() => {
        ProductService.getProductById(pros.cart.productId).then(res => {
            setProduct(res)
        })
    }, [])

    return (
        <Card className="OrderItem" sx={{ border: 0.5, borderColor: "#EBE7F3", display: "flex", marginTop: 0.5, justifyContent: 'space-between' }}>

            <Box sx={{ display: "flex" }}>
                
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={Product ? Product.images[0].imageURL : ""}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                        {Product ? Product.productName : "ok"}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                       <label>{Product ? Product.price : "ok"} VNĐ</label>
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
                    <label> (x{pros.cart.amount})</label>
                    <strong>{pros.cart.cartPrice} VND</strong>
                    
                </Box>
                
            </Box>

        </Card>
    );
}
