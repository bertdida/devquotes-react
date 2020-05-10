import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { Search } from './Search';
import * as api from './api-calls';

export function SearchContainer(props) {
  const [query, setQuery] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function onChangeField(event) {
    const { value } = event.target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setQuery(value);
    if (!value) {
      return setIsLoading(false);
    }

    setIsLoading(true);
    setTypingTimeout(
      setTimeout(async () => {
        const response = await api.searchQuotes(value);
        const { data } = response.data;
        setQuotes(data.map(quote => quote.data));
        setHasSearched(true);
        setIsLoading(false);
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
