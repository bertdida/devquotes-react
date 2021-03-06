import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { axios } from 'common/api/axios';
import api from 'common/api';
import { TitleSkeleton } from './TitleSkeleton';
import { useStyles } from './QuoteDialog.style';

const { fetchQuoteContributor } = api;
const { CancelToken } = axios;
let cancel;

export function Title({ onClose, quote }) {
  const classes = useStyles();
  const [contributor, setContributor] = useState();
  const [dateCreated, setDateCreated] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id, created_at } = quote;

  useEffect(() => {
    (async () => {
      const response = await fetchQuoteContributor(id, {
        cancelToken: new CancelToken(c => (cancel = c)),
      });

      setContributor(response.data.data);
      setIsLoading(false);
    })();

    return function cleanUp() {
      if (typeof cancel === 'function') {
        cancel();
      }
    };
  }, [id]);

  useEffect(() => {
    const date = new Date(created_at);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    setDateCreated(`${month} ${day}, ${year}`);
  }, [created_at]);

  return (
    <DialogTitle disableTypography className={classes.title}>
      {isLoading ? (
        <TitleSkeleton />
      ) : (
        <CardHeader
          avatar={
            <Avatar alt={contributor.name} src={contributor.picture_url} />
          }
          title={contributor.name}
          subheader={dateCreated}
          className={`${classes.title}__cardHeader`}
        />
      )}

      <IconButton
        aria-label="close"
        onClick={onClose}
        className={`${classes.title}__closeButton`}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

Title.propTypes = {
  quote: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
