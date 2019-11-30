import React, { useState } from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function useSnackbar() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close(_, reason) {
    if (reason !== "clickaway") {
      setIsOpen(false);
    }
  }

  return [isOpen, open, close];
}

function Snackbar({ message, ...props }) {
  return (
    <MuiSnackbar
      {...props}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={1000}
      TransitionComponent={Slide}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
}

export { useSnackbar, Snackbar };
