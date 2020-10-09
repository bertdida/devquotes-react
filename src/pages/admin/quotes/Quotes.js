import React from 'react';
import { Helmet } from 'react-helmet';

import { Table } from './Table';

export function Quotes() {
  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <Table />
    </React.Fragment>
  );
}
