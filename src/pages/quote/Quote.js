import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { QuoteSkeleton } from 'components/QuoteSkeleton';
import { Quote as QuoteItem } from 'components/Quote';
import api from 'common/api';

const { fetchQuote } = api;

export function Quote() {
  const history = useHistory();
  const match = useRouteMatch();

  const [params, setParams] = useState(null);
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params === null) {
      return;
    }

    (async () => {
      setIsLoading(true);

      try {
        const response = await fetchQuote(params.id);
        setQuote(response.data.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      }
    })();
  }, [history, params]);

  useEffect(() => {
    setQuote(null);
    setParams(match.params);
  }, [match.params]);

  if (isLoading || quote === null) {
    return <QuoteSkeleton />;
  }

  if (quote.slug !== params.slug) {
    return <Redirect to={`/quotes/${quote.id}/${quote.slug}`} />;
  }

  return (
    <>
      <Helmet>
        <title>DevQuotes | {`${quote.quotation} — ${quote.author}`}</title>
      </Helmet>

      <QuoteItem quote={quote} history={history} />
    </>
  );
}
