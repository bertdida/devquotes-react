import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(theme => {
  const isDarkTheme = theme.palette.type === 'dark';

  return {
    twitterButton: {
      color: isDarkTheme ? '#fff' : '#1da1f2',
    },
    facebookButton: {
      color: isDarkTheme ? '#fff' : '#298aff',
    },
  };
});

export function ActionsUser(props) {
  const classes = useStyles();
  const { shareOnTwitter, shareOnFacebook, copyLink } = props;

  return (
    <React.Fragment>
      <IconButton
        className={classes.twitterButton}
        onClick={shareOnTwitter}
        data-testid="button-twiter-share"
        aria-label="share on twitter"
      >
        <TwitterIcon />
      </IconButton>

      <IconButton
        className={classes.facebookButton}
        onClick={shareOnFacebook}
        data-testid="button-facebook-share"
        aria-label="share on facebook"
      >
        <FacebookIcon />
      </IconButton>

      <IconButton
        onClick={copyLink}
        data-testid="button-copy-link"
        aria-label="copy link"
      >
        <LinkIcon />
      </IconButton>
    </React.Fragment>
  );
}

ActionsUser.propTypes = {
  shareOnTwitter: PropTypes.func.isRequired,
  shareOnFacebook: PropTypes.func.isRequired,
  copyLink: PropTypes.func.isRequired,
};
