import * as React from "react";
import { Container, Divider, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { OrderContext } from "../../helpers/context/orderContext"
import OrderItemHitory from "../../components/order/OrderItemHistory";
import { CustomersService } from "../../helpers/service/customerService";
import { AuthContext } from "../../helpers/context/authContext";

function OrderHistoryPAge() {
    const { ListCart, ListCartOrderPending } = useContext(OrderContext)
    const [ListOrder, setListOrder] = useState([])
    const { authState: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        CustomersService.getOrderByCustomer(user.customerId).then(res => {
            setListOrder(res)
            console.log(res)
        })

    }, [])

    console.log(ListCart)
    return (
        <>
            <Container sx={{ marginTop: "150px" }}>
                <Grid container spacing={5} paddingX={20}><h5>DANH SÁCH ĐƠN HÀNG</h5></Grid>

                <Divider />
                <Grid container spacing={5} paddingX={15}>
                    {
                        ListOrder.map(e => {
                            return (
                                <Grid item xs={10}>
                                    <br />
                                    <h5 > Đơn Hàng: {e.id} </h5>
                                    <p></p>
                                    {
                                        e.oderDetails.map(item => {
                                            return (
                                                <OrderItemHitory cart={item} />
                                            )
                                        })
                                    }
                                    <br />
                                    <h5>TOTAL: {e.totalPrice} VNĐ</h5>
                                    <Divider />
                                </Grid>
                            )
                        })
                    }


                </Grid>
            </Container>
        </>
    )
}

export default OrderHistoryPAge;