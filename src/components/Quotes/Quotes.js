import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { EmptyResult } from '../EmptyResult';
import { Quote } from '../Quote';
import { QuoteSkeleton } from '../QuoteSkeleton';
import { Pagination } from './Pagination';

export function Quotes(props) {
  const { updatePage, fetchQuotes } = props;
  const history = useHistory();

  const [quotes, setQuotes] = useState();
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState();

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    setPage(query.page || 1);
  }, [history.location.search]);

  useEffect(() => {
    if (page === undefined) return;

    fetchQuotes({ page })
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

  if (isLoading) {
    return <QuoteSkeleton />;
  }

  if (quotes.length === 0) {
    return <EmptyResult />;
  }

  return (
    <React.Fragment>
      {quotes.map(quote => (
        <Quote key={quote.id} quote={quote} />
      ))}

      <Pagination pagination={pagination} updatePage={updatePage} />
    </React.Fragment>
  );
}

Quotes.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
};
