import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';

import { useAuth } from 'common/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  userCard: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&__avatar': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginBottom: theme.spacing(2),
    },
    '&__stat': {
      fontWeight: 400,
    },
  },
}));

export function UserCard(props) {
  const { user } = useAuth();
  return user ? <Authenticated user={user} /> : <Anonymous {...props} />;
}

function Anonymous({ onClose }) {
  const classes = useStyles();
  const history = useHistory();

  function onButtonClick() {
    history.push('/signin');
    onClose();
  }

  return (
    <div className={classes.userCard}>
      <Typography paragraph>Sign in to like and submit quotes.</Typography>
      <Button
        color="secondary"
        variant="outlined"
        onClick={onButtonClick}
        startIcon={<AccountCircleIcon />}
      >
        Sign In
      </Button>
    </div>
  );
}

Anonymous.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function Authenticated({ user }) {
  const classes = useStyles();
  const { picture_url, name, total_likes, total_submitted } = user;

  return (
    <div className={classes.userCard}>
      <Avatar
        alt={name}
        src={picture_url}
        className={`${classes.userCard}__avatar`}
      />
      <Typography gutterBottom>{name}</Typography>

      <StatTypography>{total_likes} Favorites</StatTypography>
      <StatTypography>{total_submitted} Submitted Quotes</StatTypography>
    </div>
  );
}

Authenticated.propTypes = {
  user: PropTypes.object.isRequired,
};

function StatTypography({ children }) {
  const classes = useStyles();

  return (
    <Typography
      variant="subtitle2"
      color="textSecondary"
      className={`${classes.userCard}__stat`}
    >
      {children}
    </Typography>
  );
}

StatTypography.propTypes = {
  children: PropTypes.node,
};
