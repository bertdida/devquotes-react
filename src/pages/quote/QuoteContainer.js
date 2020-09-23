import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { Skeleton } from 'common/Quote/Skeleton';
import { Quote } from './Quote';
import * as api from './api-calls';

export function QuoteContainer({ match, history, ...props }) {
  const [params, setParams] = useState(null);
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params === null) return;

    setIsLoading(true);

    api
      .fetchQuote(params.id)
      .then(response => {
        setQuote(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [history, params]);

  useEffect(() => {
    setQuote(null);
    setParams(match.params);
  }, [match]);

  if (isLoading || quote === null) {
    return <Skeleton />;
  }

  if (quote.slug !== params.slug) {
    return <Redirect to={`/quotes/${quote.id}/${quote.slug}`} />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | {`${quote.quotation} — ${quote.author}`}</title>
      </Helmet>

      <Quote quote={quote} history={history} {...props} />
    </React.Fragment>
  );
}

QuoteContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
