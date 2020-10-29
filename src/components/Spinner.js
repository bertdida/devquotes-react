import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  message: {
    marginLeft: theme.spacing(1),
  },
}));

export function Spinner({ message = null }) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress size={20} color="secondary" />
      {message && (
        <Typography className={classes.message}>{message}</Typography>
      )}
    </Box>
  );
}

Spinner.propTypes = {
  message: PropTypes.string,
};
