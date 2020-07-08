import React from 'react';
import PropTypes from 'prop-types';

import { QuoteContainer } from 'common/Quote';
import { Pagination } from './Pagination';
import { EmptyResult } from './EmptyResult';

export function Quotes(props) {
  const { quotes, pagination, updatePage } = props;

  if (quotes.length === 0) {
    return <EmptyResult />;
  }

  return (
    <React.Fragment>
      {quotes.map(quote => (
        <QuoteContainer key={quote.id} quote={quote} {...props} />
      ))}

      <Pagination pagination={pagination} updatePage={updatePage} />
    </React.Fragment>
  );
}

Quotes.propTypes = {
  quotes: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  updatePage: PropTypes.func.isRequired,
};
