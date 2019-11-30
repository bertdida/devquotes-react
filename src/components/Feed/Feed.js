import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";
import Skeleton from "../Quote/Skeleton";
import { useSnackbar, Snackbar } from "../Snackbar";

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
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false);
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false);

  function handleLike() {
    closeSnackbar2();
    openSnackbar1();
  }

  function handleCopyLink() {
    closeSnackbar1();
    openSnackbar2();
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Skeleton />
      {quotes.map(quote => (
        <Quote
          key={quote.id}
          quote={quote}
          handleLike={handleLike}
          handleCopyLink={handleCopyLink}
        />
      ))}
      <Pagination />
      <Snackbar
        open={open1}
        onClose={closeSnackbar1}
        message="Added to favorites"
      />
      <Snackbar
        open={open2}
        onClose={closeSnackbar2}
        message="Link copied to clipboard"
      />
    </Container>
  );
}

export default Feed;
