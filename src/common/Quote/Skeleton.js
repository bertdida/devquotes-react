import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    maxWidth: 300,
    marginBottom: theme.spacing(1),
  },
  quotation: {
    height: 40,
    maxWidth: 700,
  },
}));

export default function Skeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.container} data-testid="skeleton">
      <CardContent>
        <MuiSkeleton className={classes.author}></MuiSkeleton>
        <MuiSkeleton className={classes.quotation}></MuiSkeleton>
      </CardContent>
    </Card>
  );
}
