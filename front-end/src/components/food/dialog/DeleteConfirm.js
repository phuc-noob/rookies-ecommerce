import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
export default function DeleteConfirm() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cacelClick =()=>{
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button sx ={{color:"red"}} aria-describedby={id} onClick={handleClick}>
        Delete
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ 
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button >Yes</Button>
          <Button onClick={cacelClick}>No</Button>
        </ButtonGroup>
      </Popover>
    </div>
  );
}
