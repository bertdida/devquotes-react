import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import CardHeader from '@material-ui/core/CardHeader';

import { useStyles } from './QuoteDialog.style';

export function TitleSkeleton() {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.titleSkeleton}
      avatar={<Skeleton variant="circle" width={40} height={40} />}
      title={
        <Skeleton
          variant="text"
          className={`${classes.titleSkeleton}__title`}
        />
      }
      subheader={
        <Skeleton
          variant="text"
          className={`${classes.titleSkeleton}__subheader`}
        />
      }
    />
  );
}
