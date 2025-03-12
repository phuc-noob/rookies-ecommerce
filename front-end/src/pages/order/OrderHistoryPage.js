import * as React from "react";
import { Container, Divider, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { OrderContext } from "../../helpers/context/orderContext"
import OrderItemHitory from "../../components/order/OrderItemHistory";
import { CustomersService } from "../../helpers/service/customerService";
import { AuthContext } from "../../helpers/context/AuthContext";
import { Chip, Collapse, IconButton, Typography } from "@mui/material";

function OrderHistoryPAge() {
    const { ListCart, ListCartOrderPending } = useContext( OrderContext)
    const [ListOrder, setListOrder] = useState([])
    console.log(ListOrder)
    const { authState: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        CustomersService.getOrderByCustomer(user.customerId).then(res => {
            setListOrder(res)
            console.log(res)
        })

    }, [])

    const format= (value) => {
        const listColor = {
            ORDERED: "warning",
            ACCEPTED: "success",
            REJECTED: "error",
        };
        return <Chip label={value} color={listColor[value]} />;
    }

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
                                    <h5 > Đơn Hàng: {e.id} {format(e.status)}</h5>
                                    <p></p>
                                    {
                                        e.oderDetails.map(item => {
                                            return (
                                                <OrderItemHitory cart={item} status={e.status}/>
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