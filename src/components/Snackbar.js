import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useImperativeHandle } from "react";


const StyledSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleClick() {
      setOpen(true);
    },
  }));

  const action = (
    <React.Fragment >
      <IconButton
      style={{position:'absolute',left:'0',marginLeft:'5px'}}
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <Snackbar 
   
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={props.messageText}
      action={action}
    />
  );
});

export default StyledSnackbar;
