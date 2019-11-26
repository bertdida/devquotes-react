import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateRows: `${theme.spacing(7)}px auto`,
    gridRowGap: theme.spacing(2.5)
  }
}));

function Feed() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      {quotes.map(quote => (
        <Quote key={quote.id} quote={quote} />
      ))}
      <Pagination />
    </Container>
  );
}

export default Feed;
