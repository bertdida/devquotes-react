import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Actions } from './Actions';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0),
    },
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
  quote: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing(2),
  },
  author: {
    fontStyle: 'normal',
    marginBottom: theme.spacing(2),
  },
}));

export function Quote({ quote, ...props }) {
  const classes = useStyles();
  const { author, quotation } = quote;

  return (
    <Card
      component="blockquote"
      className={classes.container}
      data-testid="quote"
    >
      <CardContent className={classes.quote}>
        <Typography variant="h5" component="p" data-testid="quotation">
          {quotation}
        </Typography>

        <Typography
          color="textSecondary"
          component="cite"
          data-testid="author"
          className={classes.author}
        >
          {author}
        </Typography>
      </CardContent>

      <Actions quote={quote} {...props} />
    </Card>
  );
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
};
