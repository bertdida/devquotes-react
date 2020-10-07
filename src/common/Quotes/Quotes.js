import React from 'react';
import PropTypes from 'prop-types';

import { MemoizedQuote } from 'common/Quote';
import { useSnack } from 'common/hooks/useSnack';
import { useAuth } from 'common/hooks/useAuth';
import { Pagination } from './Pagination';
import { EmptyResult } from './EmptyResult';

export function Quotes(props) {
  const { quotes, pagination, updatePage } = props;
  const { dispatch } = useSnack();
  const { user } = useAuth();

  if (quotes.length === 0) {
    return <EmptyResult />;
  }

  return (
    <React.Fragment>
      {quotes.map(quote => (
        <MemoizedQuote
          key={quote.id}
          quote={quote}
          user={user}
          snackDispatch={dispatch}
        />
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
