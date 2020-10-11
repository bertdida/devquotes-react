import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { QuoteSkeleton } from 'components/QuoteSkeleton';
import { EmptyResult } from 'components/EmptyResult';
import { Quote } from 'components/Quote';
import * as api from './api-calls';

export function Home() {
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

    return (
      <React.Fragment>
        <Quote quote={quote} />

        <Box display="flex" justifyContent="flex-end">
          <Button
            disableElevation
            color="secondary"
            variant="contained"
            style={{ borderRadius: 40 }}
            onClick={requestQuote}
            aria-label="get another quote"
          >
            Get Another Quote
          </Button>
        </Box>
      </React.Fragment>
    );
  }, [quote]);

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Home</title>
      </Helmet>
      {isLoading ? <QuoteSkeleton /> : <Result />}
    </React.Fragment>
  );
}
