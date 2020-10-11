import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from './QuoteSkeleton.style';

export function QuoteSkeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.skeleton} role="alert" aria-label="loading">
      <CardContent>
        <Skeleton className={`${classes.skeleton}__author`} />
        <Skeleton className={`${classes.skeleton}__quotation`} />
      </CardContent>
      <CardActions>
        <Skeleton className={`${classes.skeleton}__button`} />
      </CardActions>
    </Card>
  );
}
