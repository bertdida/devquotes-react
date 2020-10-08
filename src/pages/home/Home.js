import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import { Quote } from 'common/Quote';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  fab: {
    boxShadow: 'none !important',
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

export function Home({ quote, requestQuote }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Quote quote={quote} />

      <div className={classes.footer}>
        <Fab
          size="medium"
          color="secondary"
          variant="extended"
          className={classes.fab}
          onClick={requestQuote}
        >
          Get Another Quote
        </Fab>
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  quote: PropTypes.object.isRequired,
  requestQuote: PropTypes.func.isRequired,
};
