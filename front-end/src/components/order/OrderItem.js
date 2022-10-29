import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function OrderItem() {
    return (
        <Card className="OrderItem" sx={{ display: "flex", marginTop: 0.5, background: '#e3f2fd', justifyContent: 'space-between' }}>
            <Box sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://res.cloudinary.com/dk2peasgq/image/upload/v1666201801/cld-sample-4.jpg"
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        Mac Miller
                    </Typography>
                </CardContent>

            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": {
                        m: 1
                    }
                }}
            >
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button size="small"><RemoveIcon/></Button>
                    <Button size="small">10</Button>
                    <Button size="small"><AddIcon/></Button>
                </ButtonGroup>
            </Box>

        </Card>
    );
}
