import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useHistory, useLocation } from 'react-router-dom';

import { useArrowKeyPagination } from './useArrowKeyPagination';

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

export function Pagination({ pagination }) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const { curr_page, next_page, prev_page, per_page, total } = pagination;
  const startCount = curr_page * per_page - (per_page - 1);
  const endCount = Math.min(startCount + per_page - 1, total);

  useArrowKeyPagination({ nextPage, previousPage });

  function previousPage() {
    if (prev_page !== null) {
      updatePage(curr_page - 1);
    }
  }

  function nextPage() {
    if (next_page !== null) {
      updatePage(curr_page + 1);
    }
  }

  function updatePage(page) {
    const newLocation = {
      pathname,
      ...(page > 1 && { search: `?page=${page}` }),
    };

    history.push(newLocation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
  pagination: PropTypes.object.isRequired,
};
