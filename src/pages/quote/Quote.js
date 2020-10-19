import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { QuoteSkeleton } from 'components/QuoteSkeleton';
import { Quote as QuoteItem } from 'components/Quote';
import api from 'common/api';

const { fetchQuote } = api;

export function Quote() {
  // useRouterMatch returns a new object on each render — which causes
  // rerenders and extra API calls in our case. We can avoid that by
  // memoizing Quote and implement our custom equality check for params.
  // GH issue: https://github.com/ReactTraining/react-router/issues/7059

  const { params } = useRouteMatch();
  return <MemoizedQuote params={params} />;
}

const MemoizedQuote = memo(WrappedQuote, (prevProps, nextProps) => {
  const { params: prevParams } = prevProps;
  const { params: nextParams } = nextProps;
  return prevParams.id === nextParams.id && prevParams.slug === nextParams.slug;
});

function WrappedQuote({ params: paramsProp }) {
  const history = useHistory();
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
    setParams(paramsProp);
  }, [paramsProp]);

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

WrappedQuote.propTypes = {
  params: PropTypes.object.isRequired,
};
