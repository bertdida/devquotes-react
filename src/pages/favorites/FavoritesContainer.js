import React from 'react';
import PropTypes from 'prop-types';

import QuotesContainer from 'common/Quotes';
import * as api from './api-calls';

export default function FavoritesContainer(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/favorites', search: `?page=${page}` });
  }

  return (
    <QuotesContainer
      fetchQuotes={api.fetchQuotes}
      updatePage={updatePage}
      {...props}
    />
  );
}

FavoritesContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
