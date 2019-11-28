import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";

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

  return (
    <Container maxWidth="sm" className={classes.container}>
      {quotes.map(quote => (
        <Quote key={quote.id} quote={quote} />
      ))}
      <Pagination />
    </Container>
  );
}

export default Feed;
