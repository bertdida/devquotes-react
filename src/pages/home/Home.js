import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { QuoteSkeleton } from 'components/QuoteSkeleton';
import { EmptyResult } from 'components/EmptyResult';
import { Quote } from 'components/Quote';
import api from 'common/api';

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

  return (
    <>
      <Helmet>
        <title>DevQuotes | Home</title>
      </Helmet>

      <WrappedHome
        quote={quote}
        isLoading={isLoading}
        requestQuote={requestQuote}
      />
    </>
  );
}

function WrappedHome({ quote, isLoading, requestQuote }) {
  if (isLoading) {
    return <QuoteSkeleton />;
  }

  if (quote === null) {
    return <EmptyResult />;
  }

  return (
    <>
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
    </>
  );
}

WrappedHome.propTypes = {
  quote: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  requestQuote: PropTypes.func.isRequired,
};
