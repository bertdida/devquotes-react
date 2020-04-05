import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Skeleton from 'common/Quote/Skeleton';
import Home from './Home';
import * as api from './api-calls';

export default function HomeContainer(props) {
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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Home</title>
      </Helmet>

      <Home quote={quote} requestQuote={requestQuote} {...props} />
    </React.Fragment>
  );
}
