import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";

import { fetchQuotes, deleteQuote, updateQuote } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";
import { AuthContext } from "../Auth";

function FeedContainer(props) {
  const [user] = useContext(AuthContext);
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { page: initialPage } = queryString.parse(props.location.search);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (user || !quotes.data) {
      return;
    }

    // is_liked value to false if no user is signed in
    const newQuoteData = quotes.data.map(quote => {
      return { ...quote, data: { ...quote.data, is_liked: false } };
    });

    setQuotes({ ...quotes, data: newQuoteData });
  }, [user]);

  useEffect(() => {
    async function _fetchQuotes() {
      const response = await fetchQuotes(page || 1);
      setQuotes(response.data);
      setIsLoading(false);
    }

    _fetchQuotes();
  }, [page]);

  useEffect(() => {
    let isMounted = true;
    props.history.listen(location => {
      const query = queryString.parse(location.search);
      isMounted && setPage(query.page);
    });

    return () => {
      isMounted = false;
    };
  }, [props.history]);

  function _setPage(page) {
    props.history.push({ pathname: "/", search: "?page=" + page });
  }

  async function _deleteQuote({ id }, callback) {
    await deleteQuote(id);
    const response = await fetchQuotes(quotes.curr_page);
    setQuotes(response.data);
    callback();
  }

  async function toggleLike(quote) {
    const params = { id: quote.id, is_liked: !quote.is_liked };
    const response = await updateQuote(params);
    const { data } = response.data;

    setQuotes({
      ...quotes,
      data: quotes.data.map(({ data: _data }) => {
        return { data: _data.id === data.id ? data : _data };
      })
    });
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Feed
      data={{ quotes }}
      setPage={_setPage}
      deleteQuote={_deleteQuote}
      toggleLike={toggleLike}
      {...props}
    />
  );
}

export default FeedContainer;
