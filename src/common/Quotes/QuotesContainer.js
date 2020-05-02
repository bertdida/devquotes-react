import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Skeleton from 'common/Quote/Skeleton';
import Quotes from './Quotes';

export default function QuotesContainer(props) {
  const { location, history, updatePage, fetchQuotes } = props;
  const [quotes, setQuotes] = useState();
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { page: initialPage } = queryString.parse(location.search);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    fetchQuotes(page || 1)
      .then(response => {
        const { data, ...rest } = response.data;
        setQuotes(data.map(quote => quote.data));
        setPagination(rest);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [fetchQuotes, history, page]);

  useEffect(() => {
    let isMounted = true;
    history.listen(_location => {
      const query = queryString.parse(_location.search);
      if (isMounted) {
        setPage(query.page);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Quotes
      quotes={quotes}
      pagination={pagination}
      updatePage={updatePage}
      {...props}
    />
  );
}

QuotesContainer.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
