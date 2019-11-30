import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Actions from "./Actions";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
      margin: theme.spacing(3)
    },
    "&:hover": {
      boxShadow: theme.shadows[8]
    }
  },
  quote: {
    display: "flex",
    flexDirection: "column-reverse",
    marginBottom: theme.spacing(2)
  },
  author: {
    fontStyle: "normal",
    marginBottom: theme.spacing(2)
  }
}));

function Quote({ quote, handleLike, handleCopyLink }) {
  const classes = useStyles();

  return (
    <Card component="blockquote" className={classes.container}>
      <CardContent className={classes.quote}>
        <Typography variant="h5" component="p">
          {quote.phrase}
        </Typography>
        <Typography
          color="textSecondary"
          component="cite"
          className={classes.author}
        >
          {quote.author}
        </Typography>
      </CardContent>
      <Actions handleLike={handleLike} handleCopyLink={handleCopyLink} />
    </Card>
  );
}

export default Quote;