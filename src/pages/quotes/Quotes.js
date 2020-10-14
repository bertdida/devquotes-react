import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { Quotes as CommonQuotes } from 'components/Quotes';
import api from 'common/api';

const { fetchQuotes } = api;

export function Quotes() {
  const history = useHistory();

  function updatePage(page) {
    history.push({ pathname: '/quotes', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Quotes</title>
      </Helmet>

      <CommonQuotes fetchQuotes={fetchQuotes} updatePage={updatePage} />
    </React.Fragment>
  );
}
