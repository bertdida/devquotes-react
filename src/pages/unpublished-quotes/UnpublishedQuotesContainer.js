import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Table } from 'common/UnpublishedQuotes';
import * as api from './api-calls';

export function UnpublishedQuotesContainer(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/quotes', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Unpublished Quotes</title>
      </Helmet>

      <Table fetchQuotes={api.fetchQuotes} updatePage={updatePage} {...props} />
    </React.Fragment>
  );
}

UnpublishedQuotesContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
