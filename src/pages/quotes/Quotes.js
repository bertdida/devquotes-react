import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { Quotes as CommonQuotes } from 'common/Quotes';
import { fetchQuotes } from './api-calls';

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
