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

function Pagination({ setPage, quotes }) {
  const classes = useStyles();
  const { curr_page, next_page, prev_page, per_page, total } = quotes;
  const startCount = curr_page * per_page - (per_page - 1);
  const endCount = Math.min(startCount + per_page - 1, total);

  function handlePaginate(page) {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={classes.pagination} data-testid="pagination">
      <Typography component="p" className={classes.paginationPage}>
        {startCount}-{endCount} of {total}
      </Typography>
      <IconButton
        disabled={prev_page === null}
        onClick={() => handlePaginate(quotes.curr_page - 1)}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        disabled={next_page === null}
        onClick={() => handlePaginate(quotes.curr_page + 1)}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}

export default Pagination;
