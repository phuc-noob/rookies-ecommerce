import {
    Grid,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { CustomersService } from "../../helpers/service/customerService";
import { useNavigate } from "react-router-dom";

const initCustomer = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gender: "MALE",
    dayOfBirth: Date.now()
};


function FormCustomer({ edit }) {
    const [stateForm, setStateForm] = useState(initCustomer);
    const nagivate = useNavigate()
    
    const cancelClick = () => {
        nagivate("/admin/customers")
    }

    const onSaveClick = (e) => {
        e.preventDefault();
        console.log(stateForm)
        CustomersService.saveCustomer(stateForm).then(res =>{
            nagivate("/admin/customers")
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
                maxWidth={700}
                spacing={3}
                sx={{ minHeight: "350px", border: 1,paddingY:5,  borderColor: "#979793", borderRadius: 3 }}
                
            >
                <Grid component={"form"} onSubmit={onSaveClick} item lg={7} md={7} paddingX={7}>
                    <Grid container direction="column" >
                        <Grid container direction={"row"}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>First Name</strong>
                            </Typography>
                            <TextField
                                size="small"
                                required
                                fullWidth
                                name="firstName"
                                onChange={handleChangeText}
                                value={stateForm.firstName}
                            />

                        </Grid>
                        <Grid
                            container direction={"row"}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Last Name</strong>
                            </Typography>
                            <TextField
                                size="small"
                                required
                                fullWidth
                                name="lastName"
                                onChange={handleChangeText}
                                value={stateForm.lastName}
                            />

                        </Grid>
                        <Grid container direction={"row"}
                            required
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Phone</strong>
                            </Typography>
                            <TextField
                                size="small"
                                type="number"
                                name="phone"
                                multiline
                                maxRows={5}
                                fullWidth
                                onChange={handleChangeText}
                                value={stateForm.phone}
                            />
                        </Grid>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Email</strong>
                            </Typography>

                            <TextField
                                size="small"
                                type="email"
                                fullWidth
                                required
                                name="email"
                                onChange={handleChangeText}
                                value={stateForm.email}
                            />
                        </Grid>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Address</strong>
                            </Typography>

                            <TextField
                                fullWidth
                                size="small"
                                required
                                name="address"
                                onChange={handleChangeText}
                                value={stateForm.address}
                            />
                        </Grid>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Password</strong>
                            </Typography>

                            <TextField
                                type={"password"}
                                fullWidth
                                size="small"
                                required
                                name="password"
                                onChange={handleChangeText}
                                value={stateForm.password}
                            />
                        </Grid>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start", pr: 2 }}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>Gender</strong>
                            </Typography>

                            <Select
                                size="small"
                                labelId="demo-simple-select-standard-label"
                                name="gender"
                                value={stateForm.gender}
                                onChange={handleChangeText}
                                placeholder="Status"
                            >
                                <MenuItem value={"MALE"}>MALE</MenuItem>
                                <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
                            </Select>
                        </Grid>

                        <Grid
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "115px" }}>
                                <strong>DoB</strong>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
                                <DesktopDatePicker

                                    value={stateForm.dayOfBirth}
                                    minDate={dayjs("2001-07-23")}
                                    onChange={(newvalue) => {
                                        setStateForm(pre => {
                                            return{
                                                ...pre,
                                                dayOfBirth:newvalue.format("YYYY-MM-DD")
                                            }
                                        })
                                    }}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>
                        <br />
                        <Grid sx={{ direction: "row", gap: 2 }} fullWidth>
                            <Button onClick={cancelClick} sx={{ mr: 5 ,mc:5}} type={"submit"} variant="outlined" color="inherit">
                                Cancel
                            </Button>
                            <Button type="submit" variant="outlined" >
                                Save
                            </Button>
                        </Grid>
                        <br/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default FormCustomer;
