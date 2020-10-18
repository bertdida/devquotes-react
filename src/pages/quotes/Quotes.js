import React from 'react';
import { Helmet } from 'react-helmet';

import { Quotes as CommonQuotes } from 'components/Quotes';
import api from 'common/api';

const { fetchQuotes } = api;

export function Quotes() {
  return (
    <>
      <Helmet>
        <title>DevQuotes | Quotes</title>
      </Helmet>

      <CommonQuotes fetchQuotes={fetchQuotes} />
    </>
  );
}
