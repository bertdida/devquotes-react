import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";
import Skeleton from "../Quote/Skeleton";
import Snackbar from "../Snackbar";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8)
    }
  }
}));

function Feed() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleLike() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Skeleton />
      {quotes.map(quote => (
        <Quote key={quote.id} quote={quote} handleLike={handleLike} />
      ))}
      <Pagination />
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Added to favorites"
      />
    </Container>
  );
}

export default Feed;
