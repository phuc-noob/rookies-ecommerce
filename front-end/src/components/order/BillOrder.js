import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import './index.css'
function generate(element) {
  return [0, 1, 2,3,4,5].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function BillOrder() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1,minHeight:550, Width: 1000 ,background:'#e3f2fd'}}>
      <FormGroup row></FormGroup>

      <Grid container spacing={2} >
        <Grid item xs={12} md={6} >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            
          </Typography>
          
            
            <List variant="h6" sx={{width:370}}>
              {generate(
                <ListItem sx={{backgroundColor:'transparent'}}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              )}
            </List>
          
        </Grid>
      </Grid>
    </Box>
  );
}
