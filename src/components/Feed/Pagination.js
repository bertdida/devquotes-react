import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles(theme => ({
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },
  paginationPage: {
    marginRight: theme.spacing(1)
  }
}));

function Pagination() {
  const classes = useStyles();

  return (
    <div className={classes.pagination}>
      <Typography component="p" className={classes.paginationPage}>
        1-10 of 10
      </Typography>
      <IconButton>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton>
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}

export default Pagination;
