import React from 'react';
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

import { useStyles } from './Quote.style';

export function Quote({
  quote,
  toggleLike,
  isLiking,
  shareOnTwitter,
  shareOnFacebook,
  copyLink,
}) {
  const classes = useStyles();
  const { author, quotation, is_liked, total_likes } = quote;

  function _toggleLike() {
    if (!isLiking) {
      toggleLike();
    }
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
          onClick={_toggleLike}
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
  toggleLike: PropTypes.func.isRequired,
  isLiking: PropTypes.bool.isRequired,
  shareOnTwitter: PropTypes.func.isRequired,
  shareOnFacebook: PropTypes.func.isRequired,
  copyLink: PropTypes.func.isRequired,
};
