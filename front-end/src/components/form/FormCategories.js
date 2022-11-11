import {
    Box,
    Grid,
    Typography,
    Button,
    TextField
} from "@mui/material";
import { useContext, useState } from "react";
import UploadImage from "../form/UploadImage";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../helpers/context/productContext";
import { CategoryService } from "../../helpers/service/categoryService";
import { Container } from "react-bootstrap";

const initFood = {
    cateName: "",
    description: ""
};
const initImageURLs = [];

function FormCategories() {
    const [stateForm, setStateForm] = useState(initFood);
    const {selectedFile} = useContext(ProductContext)
    const [imageURLs, setImageURLs] = useState(initImageURLs);
    const nagivate = useNavigate()
    
    const onCancelClick = ()=>{
        nagivate("/admin/categories")
    }

    const SaveCategoriesClick =async (e)=>{
        e.preventDefault();
        CategoryService.saveCategory({...stateForm,image:selectedFile}).then(() =>{
            nagivate("/admin/categories")
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
        <Container>
            <Grid

                spacing={2}
                sx={{ maxWidth: "700px", minHeight: "350px", border: 1, paddingY: 5, borderColor: "#979793", borderRadius: 3 }}
                
            >

                <Grid component={"form"} onSubmit={SaveCategoriesClick} item lg={0} md={7}  paddingX={5}>
                    <Grid container direction="column" gap={2} sx={{ pr: 2 }}>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start" }}
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "130px" }}>
                                <strong>Category name:</strong>
                            </Typography>
                            <TextField
                                required
                                size="small"
                                fullWidth
                                name="cateName"
                                onChange={handleChangeText}
                                value={stateForm.cateName}
                            />
                        </Grid>
                        <Grid
                            sx={{ flexDirection: "row", alignItems: "flex-start" }}
                            required
                        >
                            <Typography sx={{ mr: 1, my: 0.5, minWidth: "130px" }}>
                                <strong>Description:</strong>
                            </Typography>
                            <TextField
                                required
                                name="description"
                                size="small"
                                multiline ={true}
                                maxRows={5}
                                fullWidth
                                onChange={handleChangeText}
                                value={stateForm.description}
                            />
                        </Grid>
                        <Grid item lg={5} md={5} sx={{ border: 0, borderRadius: "16px", borderColor: "#5F795C" }}>
                            <UploadImage value={imageURLs} setState={setImageURLs} />
                        </Grid>


                        <Grid sx={{ flexDirection: "row", gap: 2 }} fullWidth>
                            <Button onClick={onCancelClick} variant="outlined" color="inherit">
                                Cancel
                            </Button>
                            <Button type="submit" variant="outlined" >
                                Save
                            </Button>
                            
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default FormCategories;
