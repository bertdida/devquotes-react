import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import { useUserState } from 'common/hooks/useUser';

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
      display: 'inline-block',
    },
  },
}));

export function UserCard(props) {
  const user = useUserState();
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
      <Typography paragraph>
        Sign in to like and submit software development quotes.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
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
  const { picture_url, name, stats } = user;

  return (
    <div className={classes.userCard}>
      <Avatar
        alt={name}
        src={picture_url}
        className={`${classes.userCard}__avatar`}
      />
      <Typography gutterBottom>{name}</Typography>
      {stats && <UserStats stats={stats} />}
    </div>
  );
}

Authenticated.propTypes = {
  user: PropTypes.object.isRequired,
};

function UserStats({ stats }) {
  const { total_likes, total_submitted } = stats;

  return (
    <>
      <Box marginRight={2} display="inline-block">
        <StatTypography count={total_likes} label="Favorite" />
      </Box>
      <StatTypography count={total_submitted} label="Published Quote" />
    </>
  );
}

UserStats.propTypes = {
  stats: PropTypes.object.isRequired,
};

function StatTypography({ count, label }) {
  const classes = useStyles();

  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="textSecondary"
      className={`${classes.userCard}__stat`}
    >
      {`${count} ${label}${count > 1 ? 's' : ''}`}
    </Typography>
  );
}

StatTypography.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
