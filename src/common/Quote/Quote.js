import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';

import { useAuth } from 'common/hooks/useAuth';
import { useSnack } from 'common/hooks/useSnack';
import { useStyles } from './Quote.style';
import * as api from './api-calls';

export function Quote({ quote: initialQuote, ...props }) {
  const { user } = useAuth();
  const snack = useSnack();
  const classes = useStyles();

  const [quote, setQuote] = useState(initialQuote);
  const [isLiking, setIsLiking] = useState(false);

  const { id, author, quotation, is_liked, total_likes, slug } = quote;
  const baseUrl = window.location.origin.replace(/\/$/, '');
  const resourceUrl = `${baseUrl}/quotes/${id}/${slug}`;

  useEffect(() => {
    if (!user && is_liked === true) {
      setQuote({ ...quote, is_liked: false });
    }
  }, [user, quote, is_liked]);

  async function toggleLike() {
    if (!user) {
      return props.history.push('/signin');
    }

    if (isLiking) {
      return;
    }

    setIsLiking(true);

    const apiFunction = !is_liked ? api.likeQuote : api.unlikeQuote;
    const response = await apiFunction(quote);
    const { data } = response.data;
    setQuote(data);
    setIsLiking(false);

    if (data.is_liked) {
      snack.create('Added to favorites.');
    }
  }

  function copyLink() {
    window.navigator.clipboard.writeText(resourceUrl);
    snack.create('Link copied to clipboard.');
  }

  function shareOnFacebook() {
    window.FB.ui({
      method: 'share',
      quote: `${quotation} — ${author}`,
      href: resourceUrl,
    });
  }

  function shareOnTwitter() {
    const text = encodeURIComponent(`${quotation} — ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }

  return (
    <Card component="blockquote" className={classes.quote}>
      <CardContent className={`${classes.quote}__inner`}>
        <Typography variant="h5" component="p">
          {quotation}
        </Typography>

        <Typography
          color="textSecondary"
          component="cite"
          className={`${classes.quote}__author`}
        >
          {author}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          disableElevation
          color={is_liked ? 'secondary' : 'default'}
          variant="contained"
          className={`${classes.quote}__like`}
          onClick={toggleLike}
          aria-label="like quote"
          startIcon={<FavoriteIcon />}
        >
          {total_likes}
        </Button>

        <IconButton
          className={`${classes.quote}__twitter`}
          onClick={shareOnTwitter}
          aria-label="share on twitter"
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          className={`${classes.quote}__facebook`}
          onClick={shareOnFacebook}
          aria-label="share on facebook"
        >
          <FacebookIcon />
        </IconButton>

        <IconButton onClick={copyLink} aria-label="copy link">
          <LinkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
  history: PropTypes.object,
};
