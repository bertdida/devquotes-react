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

function Snackbar({ message, autoHideDuration = 1000, ...props }) {
  return (
    <MuiSnackbar
      {...props}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      TransitionComponent={Slide}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
}

export { useSnackbar, Snackbar };
