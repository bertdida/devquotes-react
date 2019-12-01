import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Actions from "./Actions";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0)
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

function Quote(props) {
  const classes = useStyles();
  const { author, quotation } = props.quote;

  return (
    <Card component="blockquote" className={classes.container}>
      <CardContent className={classes.quote}>
        <Typography variant="h5" component="p">
          {quotation}
        </Typography>
        <Typography
          color="textSecondary"
          component="cite"
          className={classes.author}
        >
          {author}
        </Typography>
      </CardContent>
      <Actions {...props} />
    </Card>
  );
}

export default Quote;
