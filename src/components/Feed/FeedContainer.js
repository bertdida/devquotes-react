import React, { useEffect, useState } from "react";
import queryString from "query-string";

import { fetchQuotes, deleteQuote } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";

function FeedContainer(props) {
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { page: initialPage } = queryString.parse(props.location.search);
  const [page, setPage] = useState(initialPage);

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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Feed
      data={{ quotes }}
      setPage={_setPage}
      deleteQuote={_deleteQuote}
      {...props}
    />
  );
}

export default FeedContainer;
