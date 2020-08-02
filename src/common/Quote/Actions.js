import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

import { useAuth } from 'common/hooks/useAuth';
import { ActionsUser } from './ActionsUser';
import { ActionsAdmin } from './ActionsAdmin';

const useStyles = makeStyles(theme => ({
  container: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  textDanger: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    color: red['500'],
  },
  like: {
    boxShadow: 'none !important',
    marginRight: 'auto',
  },
  likeIcon: {
    marginRight: theme.spacing(0.5),
  },
}));

export function Actions({ quote, isDeleted, toggleLike, isLiking, ...props }) {
  const classes = useStyles();
  const { user } = useAuth();
  const isAdmin = user && user.is_admin;

  function _toggleLike() {
    if (!isLiking) {
      toggleLike();
    }
  }

  return (
    <CardActions className={classes.container}>
      {isDeleted ? (
        <div className={classes.textDanger}>
          <p>This quote has been deleted.</p>
        </div>
      ) : (
        <React.Fragment>
          <Fab
            size="medium"
            variant="extended"
            color={quote.is_liked ? 'secondary' : 'default'}
            className={classes.like}
            onClick={_toggleLike}
            aria-label="like quote"
          >
            <FavoriteIcon className={classes.likeIcon} />
            {quote.total_likes}
          </Fab>

          {isAdmin ? <ActionsAdmin {...props} /> : <ActionsUser {...props} />}
        </React.Fragment>
      )}
    </CardActions>
  );
}

Actions.propTypes = {
  quote: PropTypes.object.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
  isLiking: PropTypes.bool.isRequired,
};
