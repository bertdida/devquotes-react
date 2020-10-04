import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { Skeleton } from 'common/Quote/Skeleton';
import { Quote } from 'common/Quote';

const useStyles = makeStyles(theme => ({
  resultsContainer: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3, 0),
    },
  },
  message: {
    fontSize: '1.5rem',
  },
}));

function Results({ hasSearched, quotes, ...props }) {
  const classes = useStyles();

  if (!hasSearched) {
    return (
      <Typography className={classes.message}>Waiting to search</Typography>
    );
  }

  if (quotes.length === 0) {
    return (
      <Typography className={classes.message}>No results found</Typography>
    );
  }

  return (
    <React.Fragment>
      {quotes.map(quote => (
        <Quote key={quote.id} quote={quote} {...props} />
      ))}
    </React.Fragment>
  );
}

export function Search(props) {
  const { quotes, isLoading, value, onChange, hasSearched } = props;
  const classes = useStyles();

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <TextField
          value={value}
          onChange={onChange}
          color="secondary"
          placeholder="Search by author or quotation..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <div className={classes.resultsContainer}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Results quotes={quotes} hasSearched={hasSearched} {...props} />
        )}
      </div>
    </React.Fragment>
  );
}

Results.propTypes = {
  quotes: PropTypes.array.isRequired,
  hasSearched: PropTypes.bool.isRequired,
};

Search.propTypes = {
  quotes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasSearched: PropTypes.bool.isRequired,
};
