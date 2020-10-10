import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { axios } from 'common/axios';
import * as api from '../api-calls';
import { TitleSkeleton } from './TitleSkeleton';

const { CancelToken } = axios;
let cancel;

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  cardHeader: {
    padding: 0,
  },
});

export const Title = withStyles(styles)(props => {
  const { classes, onClose, quote, ...other } = props;
  const [contributor, setContributor] = useState();
  const [dateCreated, setDateCreated] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .fetchQuoteContributor(quote, {
        cancelToken: new CancelToken(c => (cancel = c)),
      })
      .then(({ data }) => {
        setContributor(data.data);
        setIsLoading(false);
      });

    return () => {
      if (typeof cancel === 'function') {
        cancel();
      }
    };
  }, [quote]);

  useEffect(() => {
    const date = new Date(quote.created_at);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    setDateCreated(`${month} ${day}, ${year}`);
  }, [quote.created_at]);

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {isLoading ? (
        <TitleSkeleton />
      ) : (
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar alt={contributor.name} src={contributor.picture_url} />
          }
          title={contributor.name}
          subheader={dateCreated}
        />
      )}

      {onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});
