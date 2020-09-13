import React from 'react';
import Proptypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { default as MuiToolbar } from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Delete, Create, Filter } from './Buttons';

const useStyles = makeStyles(theme => ({
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    marginRight: 'auto',
  },
}));

function Title({ props, children }) {
  const classes = useStyles();

  return (
    <Typography className={classes.title} component="div" {...props}>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  props: Proptypes.object,
  children: Proptypes.node.isRequired,
};

export function Toolbar({ totalSelectedQuotes, deleteSelected }) {
  const classes = useStyles();
  const hasSelection = totalSelectedQuotes > 0;

  return (
    <MuiToolbar className={clsx({ [classes.highlight]: hasSelection })}>
      {hasSelection ? (
        <>
          <Title variant="subtitle1" color="inherit">
            {totalSelectedQuotes} selected
          </Title>

          <Delete deleteSelected={deleteSelected} />
        </>
      ) : (
        <>
          <Title variant="h6" id="tableTitle">
            Quotes
          </Title>

          <Create />
          <Filter />
        </>
      )}
    </MuiToolbar>
  );
}

Toolbar.propTypes = {
  totalSelectedQuotes: Proptypes.number.isRequired,
  deleteSelected: Proptypes.func.isRequired,
};
