import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { QuoteContainer } from 'common/Quote';
import { Pagination } from './Pagination';

export function Quotes(props) {
  const { quotes, pagination, updatePage } = props;

  if (quotes.length === 0) {
    return <Typography variant="h3">Nothing to show</Typography>;
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
