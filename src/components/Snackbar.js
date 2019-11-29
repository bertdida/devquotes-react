import React from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function Snackbar({ message, ...props }) {
  return (
    <MuiSnackbar
      {...props}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={6000}
      TransitionComponent={Slide}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
}

export default Snackbar;
