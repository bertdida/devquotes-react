import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Skeleton } from 'common/Quote/Skeleton';
import { EmptyResult } from 'common/Quotes/EmptyResult';
import { Home } from './Home';
import * as api from './api-calls';

export function HomeContainer() {
  const [quote, setQuote] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  async function requestQuote() {
    setIsLoading(true);

    try {
      const response = await api.fetchRandomQuote();
      setQuote(response.data.data);
    } catch (error) {
      if (!error.response || error.response.status !== 404) {
        throw error;
      }

      setQuote(null);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    requestQuote();
  }, []);

  const Result = useCallback(() => {
    if (quote === null) {
      return <EmptyResult />;
    }

    return <Home quote={quote} requestQuote={requestQuote} />;
  }, [quote]);

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Home</title>
      </Helmet>
      {isLoading ? <Skeleton /> : <Result />}
    </React.Fragment>
  );
}
