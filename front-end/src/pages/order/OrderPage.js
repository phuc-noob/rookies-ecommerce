import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import OrderItem from "../../components/order/OrderItem";
import BillOrder from "../../components/order/BillOrder";
function OrderPage() {
    return (
        <>
            <Container sx={{ marginTop: "70px" }}>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <br />
                        <h5 > CART </h5>
                        <p></p>
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                    </Grid>
                    <Grid item xs={4} >
                        <br />
                        <h5 > BILL-ORDER </h5>
                        <p></p>
                        <BillOrder />
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}

export default OrderPage;