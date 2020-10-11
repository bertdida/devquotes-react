import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { default as MuiSkeleton } from '@material-ui/lab/Skeleton';

import { useStyles } from './Quote.style';

export function Skeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.skeleton} role="alert" aria-label="loading">
      <CardContent>
        <MuiSkeleton className={`${classes.skeleton}__author`} />
        <MuiSkeleton className={`${classes.skeleton}__quotation`} />
      </CardContent>
      <CardActions>
        <MuiSkeleton className={`${classes.skeleton}__button`} />
      </CardActions>
    </Card>
  );
}
