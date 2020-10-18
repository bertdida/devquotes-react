import React from 'react';
import { Helmet } from 'react-helmet';

import { Quotes } from 'components/Quotes';
import api from 'common/api';

const { fetchLikes } = api;

export function Favorites() {
  return (
    <>
      <Helmet>
        <title>DevQuotes | Favorites</title>
      </Helmet>

      <Quotes fetchQuotes={fetchLikes} />
    </>
  );
}
