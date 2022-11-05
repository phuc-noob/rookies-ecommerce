import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { OrderContext } from "../../helpers/context/orderContext";
import { useNavigate } from "react-router-dom";

import './index.css'
function generate(element) {
    return [0, 1, 2, 3, 4, 5].map((value) =>
        React.cloneElement(element, {
            key: value
        })
    );
}

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

export default function BillOrderDetail() {
    const navigate = useNavigate()
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const { TotalBill, setTotalBill, ListCartOrderPending, orderProduct } = React.useContext(OrderContext)

    const goOrderClick = async () => {
        orderProduct()
    }


    return (
        <>
            <Box sx={{
                flexGrow: 1,
                minHeight: 400,
                Width: 1000,
                border: 1,
                borderColor: "#DAD9D4",
                borderRadius: 3
            }}>
                <FormGroup row></FormGroup>

                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} >
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">

                        </Typography>


                        <List variant="h6" sx={{ width: 370 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    "& > *": {
                                        m: 1
                                    },
                                    alignItems: "center"
                                }}
                            >
                                <h1><strong>TOTAL BILL</strong></h1>
                                <label>------------------------------</label>
                                <h2>{TotalBill} VND</h2>
                            </Box>
                        </List>

                    </Grid>
                </Grid>

            </Box>
            <br />
            <Button onClick={goOrderClick} variant="outlined" sx={{
                maxWidth: "400px",
                width: 370,
                color: "#16802C",
                alignItems: "center",
                borderColor: "#16802C",

            }}

            >
                <strong>CHECK OUT(5)</strong>

            </Button>
        </>
    );
}
