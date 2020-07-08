import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Skeleton } from 'common/Quote/Skeleton';
import { Home } from './Home';
import * as api from './api-calls';

export function HomeContainer(props) {
  const { history } = props;
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const requestQuote = useCallback(() => {
    setIsLoading(true);
    api
      .fetchRandomQuote()
      .then(response => {
        setQuote(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [history]);

  useEffect(() => requestQuote(), [requestQuote]);

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

HomeContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
