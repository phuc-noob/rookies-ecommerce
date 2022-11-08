import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {OrderContext} from "../../helpers/context/orderContext"
import BillOrderDetail from "../../components/order/BillOrderDetail";
import OrderItemInfo from "../../components/order/OrderItemInfo";
import CustomerInfo from "../../components/order/CustomerInfo";

function OrderHistoryPAge() {
    const {ListCart,ListCartOrderPending} = useContext(OrderContext)
    console.log(ListCart)
    return (
        <>
            <Container sx={{ marginTop: "70px" }}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        
                        <br />
                        <h5 > DANH SÁCH ĐƠN HÀNG </h5>
                        <p></p>
                        <CustomerInfo/>
                    </Grid>
                    
                </Grid>
            </Container>
        </>
    )
}

export default OrderHistoryPAge;