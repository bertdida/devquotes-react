import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { QuotesContainer as Container } from 'common/Quotes';
import * as api from './api-calls';

export function QuotesContainer(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/quotes', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Quotes</title>
      </Helmet>

      <Container
        fetchQuotes={api.fetchQuotes}
        updatePage={updatePage}
        {...props}
      />
    </React.Fragment>
  );
}

QuotesContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
