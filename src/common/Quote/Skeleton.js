import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { default as MuiSkeleton } from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    minHeight: 215,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0),
    },
  },
  quote: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing(2),
  },
  author: {
    height: theme.spacing(3),
    width: '50%',
    maxWidth: 300,
    marginBottom: theme.spacing(1),
  },
  quotation: {
    height: 40,
    maxWidth: 700,
  },
  buttonContainer: {
    padding: theme.spacing(2),
  },
  button: {
    transform: 'none',
    width: 70,
    height: 35,
    borderRadius: 40,
    [theme.breakpoints.up('sm')]: {
      height: 40,
    },
  },
}));

export function Skeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.container} role="alert" aria-label="loading">
      <CardContent>
        <MuiSkeleton className={classes.author} />
        <MuiSkeleton className={classes.quotation} />
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <MuiSkeleton className={classes.button} />
      </CardActions>
    </Card>
  );
}
