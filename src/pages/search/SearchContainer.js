import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { Search } from './Search';
import * as api from './api-calls';

export function SearchContainer(props) {
  const { location, history } = props;
  const { query: initialQuery } = queryString.parse(location.search);

  const [query, setQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(query.length !== 0);

  const [quotes, setQuotes] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState();
  const [hasSearched, setHasSearched] = useState(false);

  function searchQuotes(nextQuery) {
    api.searchQuotes(nextQuery).then(response => {
      const { data } = response.data;
      setQuotes(data.map(quote => quote.data));
      setHasSearched(true);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (query.length !== 0) {
      searchQuotes(query);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isMounted = true;

    history.listen(currLocation => {
      const { query: currQuery } = queryString.parse(currLocation.search);

      if (!isMounted) {
        return;
      }

      if (currQuery === undefined) {
        setQuotes([]);
        setIsLoading(false);
        setHasSearched(false);
      } else {
        searchQuotes(currQuery);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  function onChangeField(event) {
    const { value } = event.target;
    setQuery(value);
    setIsLoading(true);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        props.history.push({
          pathname: '/search',
          search: value.length === 0 ? null : `?query=${value}`,
        });
      }, 1000)
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Search</title>
      </Helmet>

      <Search
        value={query}
        quotes={quotes}
        isLoading={isLoading}
        onChange={onChangeField}
        hasSearched={hasSearched}
        {...props}
      />
    </React.Fragment>
  );
}

SearchContainer.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
