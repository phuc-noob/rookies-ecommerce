import React, { useContext } from "react";
import { Form} from "react-bootstrap";
import { ProductContext } from "../../helpers/context/productContext";
import { Paper, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

function UploadMultipleImages() {
    const { ListImages, setListImages } = useContext(ProductContext)

    const onSelectFile = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        const ListTemp = [...ListImages]
        chosenFiles.some(e => {
            ListTemp.push(e)
        })
        setListImages(ListTemp)
        console.log(ListTemp)
    };

    const deleteImageClick =(event) =>{
        const ListTemp =[...ListImages]
        const index = ListTemp.findIndex(item => item.name ===event.currentTarget.value)
        ListTemp.splice(index,1)
        setListImages(ListTemp)
    }
 
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex pe-3">
                    <div className="flex-grow-1">
                        <Form.Group controlId="formFileSm" className="w-100 border-0">
                            <input
                                type="file"
                                multiple
                                onChange={onSelectFile}
                                size="md"
                                accept="image/*"
                            />
                            <div className="invalid-feedback">require file upload</div>
                        </Form.Group>
                    </div>
                </div>
                <Paper
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        mt: 1,
                    }}
                    component="ul"
                >
                </Paper>
            </div>
            <Grid direction="row" container >
                {
                    ListImages.map(imageItem => {
                        return (

                            <Grid item xs={3}  >
                                <Card container sx={{ maxWidth: 120 }} >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={URL.createObjectURL(imageItem)}
                                        alt="green iguana"
                                    />
                                    <Box width={100} marginLeft={5}>
                                        <IconButton value={imageItem.name} onClick={deleteImageClick}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
}

export default UploadMultipleImages;
