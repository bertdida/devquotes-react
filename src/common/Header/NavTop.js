import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import MoreOptions from './MoreOptions';

export default function NavTop({ user }) {
  return (
    <React.Fragment>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>

      <Button color="inherit" component={Link} to="/quotes">
        Quotes
      </Button>

      {user && (
        <Button
          color="inherit"
          component={Link}
          to="/favorites"
          data-testid="favorites"
        >
          Favorites
        </Button>
      )}

      <Button color="inherit" component={Link} to="/search">
        Search
      </Button>

      {!user && (
        <Button
          color="inherit"
          component={Link}
          to="/signin"
          data-testid="signIn"
        >
          Sign In
        </Button>
      )}

      <MoreOptions user={user} />
    </React.Fragment>
  );
}

NavTop.propTypes = {
  user: PropTypes.object,
};
