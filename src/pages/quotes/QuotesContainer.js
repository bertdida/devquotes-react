import React from 'react';
import PropTypes from 'prop-types';

import { default as Container } from 'common/Quotes';
import * as api from './api-calls';

export default function QuotesContainer(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/quotes', search: `?page=${page}` });
  }

  return (
    <Container
      fetchQuotes={api.fetchQuotes}
      updatePage={updatePage}
      {...props}
    />
  );
}

QuotesContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
