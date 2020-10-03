import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Actions } from './Actions';
import { useStyles } from './Quote.style';

export function Quote({ quote, ...props }) {
  const classes = useStyles();
  const { author, quotation } = quote;

  return (
    <Card component="blockquote" className={classes.quote}>
      <CardContent className={`${classes.quote}__inner`}>
        <Typography variant="h5" component="p">
          {quotation}
        </Typography>

        <Typography
          color="textSecondary"
          component="cite"
          className={`${classes.quote}__author`}
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
