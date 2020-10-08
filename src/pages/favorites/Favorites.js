import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { Quotes } from 'common/Quotes';
import { fetchQuotes } from './api-calls';

export function Favorites() {
  const history = useHistory();

  function updatePage(page) {
    history.push({ pathname: '/favorites', search: `?page=${page}` });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Favorites</title>
      </Helmet>

      <Quotes fetchQuotes={fetchQuotes} updatePage={updatePage} />
    </React.Fragment>
  );
}
