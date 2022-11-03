import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {OrderContext} from "../../helpers/context/orderContext"
import BillOrderDetail from "../../components/order/BillOrderDetail";
import OrderItemInfo from "../../components/order/OrderItemInfo";
import CustomerInfo from "../../components/order/CustomerInfo";

function OrderDetailPage() {
    const {ListCart,ListCartOrderPending} = useContext(OrderContext)
    console.log(ListCart)
    return (
        <>
            <Container sx={{ marginTop: "70px" }}>
                
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <br />
                        <h5 > CART </h5>
                        <p></p>
                        {
                            ListCartOrderPending.map(item => {
                                return(
                                    <OrderItemInfo cart={item}/>
                                )
                            })
                        }
                        <br />
                        <h5 > CUSTOMER INFO </h5>
                        <p></p>
                        <CustomerInfo/>
                    </Grid>
                    <Grid item xs={4} >
                        <br />
                        <h5 > BILL-ORDER </h5>
                        <p></p>
                        <BillOrderDetail />
                        
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}

export default OrderDetailPage;