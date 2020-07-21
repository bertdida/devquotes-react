import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
  title: {
    width: '35%',
  },
  subheader: {
    width: '25%',
  },
});

export function TitleSkeleton() {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.root}
      avatar={<Skeleton variant="circle" width={40} height={40} />}
      title={<Skeleton variant="text" className={classes.title} />}
      subheader={<Skeleton variant="text" className={classes.subheader} />}
    />
  );
}
