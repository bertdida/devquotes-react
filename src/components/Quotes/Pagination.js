import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useHistory, useLocation, Link } from 'react-router-dom';

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

  const nextPage = curr_page + 1;
  const previousPage = curr_page - 1;

  useArrowKeyPagination({ goNextPage, goPreviousPage });

  function goNextPage() {
    if (next_page !== null) {
      updatePage(nextPage);
    }
  }

  function goPreviousPage() {
    if (prev_page !== null) {
      updatePage(previousPage);
    }
  }

  function updatePage(page) {
    const newLocation = {
      pathname,
      ...(page > 1 && { search: `?page=${page}` }),
    };

    history.push(newLocation);
  }

  return (
    <div
      className={classes.container}
      role="navigation"
      aria-label="pagination"
    >
      <Typography component="p" className={classes.text}>
        {startCount}-{endCount} of {total}
      </Typography>

      <NavLink
        page={previousPage}
        disabled={prev_page === null}
        aria-label="previous page"
      >
        <NavigateBeforeIcon />
      </NavLink>

      <NavLink
        page={nextPage}
        disabled={next_page === null}
        aria-label="next page"
      >
        <NavigateNextIcon />
      </NavLink>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
};

function NavLink({ page, children, ...rest }) {
  const { pathname } = useLocation();
  const url = page === 1 ? pathname : `${pathname}?page=${page}`;

  return (
    <IconButton component={Link} to={url} {...rest}>
      {children}
    </IconButton>
  );
}

NavLink.propTypes = {
  page: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
