import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Skeleton } from 'common/Quote/Skeleton';
import { Quote } from './Quote';
import * as api from './api-calls';

export function QuoteContainer({ match, history, ...props }) {
  const { id: quoteId } = match.params;
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .fetchQuote(quoteId)
      .then(response => {
        setQuote(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [quoteId, history]);

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | {`${quote.quotation} — ${quote.author}`}</title>
      </Helmet>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Quote quote={quote} history={history} {...props} />
      )}
    </React.Fragment>
  );
}

QuoteContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
