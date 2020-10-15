import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  text: {
    marginRight: theme.spacing(1),
  },
}));

export function Pagination({ updatePage, pagination }) {
  const classes = useStyles();
  const { curr_page, next_page, prev_page, per_page, total } = pagination;
  const startCount = curr_page * per_page - (per_page - 1);
  const endCount = Math.min(startCount + per_page - 1, total);

  function handlePaginate(page) {
    updatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function previousPage() {
    handlePaginate(curr_page - 1);
  }

  function nextPage() {
    handlePaginate(curr_page + 1);
  }

  function paginateUsingArrowKeys({ key }) {
    if (key === 'ArrowLeft') {
      if (prev_page !== null) {
        previousPage();
      }
    } else if (key === 'ArrowRight') {
      if (next_page !== null) {
        nextPage();
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', paginateUsingArrowKeys);
    return function cleanUp() {
      window.removeEventListener('keydown', paginateUsingArrowKeys);
    };
  });

  return (
    <div
      className={classes.container}
      role="navigation"
      aria-label="Pagination"
    >
      <Typography component="p" className={classes.text}>
        {startCount}-{endCount} of {total}
      </Typography>

      <IconButton
        disabled={prev_page === null}
        onClick={previousPage}
        aria-label="previous page"
      >
        <NavigateBeforeIcon />
      </IconButton>

      <IconButton
        disabled={next_page === null}
        onClick={nextPage}
        aria-label="next page"
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}

Pagination.propTypes = {
  updatePage: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};
