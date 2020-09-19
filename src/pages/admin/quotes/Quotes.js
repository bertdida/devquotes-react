import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Table } from 'common/admin/quotes';
import * as api from './api-calls';

export function Quotes(props) {
  function updatePage(page) {
    props.history.push({ pathname: '/quotes', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <Table fetchQuotes={api.fetchQuotes} updatePage={updatePage} {...props} />
    </React.Fragment>
  );
}

Quotes.propTypes = {
  history: PropTypes.object.isRequired,
};
