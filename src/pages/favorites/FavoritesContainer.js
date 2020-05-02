import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import QuotesContainer from 'common/Quotes';
import * as api from './api-calls';

export default function FavoritesContainer(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/favorites', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Favorites</title>
      </Helmet>

      <QuotesContainer
        fetchQuotes={api.fetchQuotes}
        updatePage={updatePage}
        {...props}
      />
    </React.Fragment>
  );
}

FavoritesContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
