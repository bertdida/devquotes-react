import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Skeleton } from 'common/Quote/Skeleton';
import { Home } from './Home';
import * as api from './api-calls';

export function HomeContainer(props) {
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function requestQuote() {
    setIsLoading(true);

    api.fetchRandomQuote().then(response => {
      setQuote(response.data.data);
      setIsLoading(false);
    });
  }

  useEffect(() => requestQuote(), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Home</title>
      </Helmet>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Home quote={quote} requestQuote={requestQuote} {...props} />
      )}
    </React.Fragment>
  );
}
