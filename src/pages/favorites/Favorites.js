import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { Quotes } from 'components/Quotes';
import api from 'common/api';

const { fetchLikes } = api;

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

      <Quotes fetchQuotes={fetchLikes} updatePage={updatePage} />
    </React.Fragment>
  );
}
