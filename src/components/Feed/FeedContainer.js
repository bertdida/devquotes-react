import React, { useEffect, useState } from "react";
import queryString from "query-string";

import { fetchQuotes } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";

function FeedContainer(props) {
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { page: initialPage } = queryString.parse(props.location.search);
  const [page, setPage] = useState(initialPage || 1);

  useEffect(() => {
    async function _fetchQuotes() {
      const response = await fetchQuotes(page);
      setQuotes(response.data);
      setIsLoading(false);
    }

    _fetchQuotes();
  }, [page]);

  useEffect(() => {
    props.history.listen(location => {
      const query = queryString.parse(location.search);
      setPage(query.page);
    });
  }, [props.history]);

  function _setPage(page) {
    props.history.push({ pathname: "/", search: "?page=" + page });
  }

  return isLoading ? (
    <Skeleton />
  ) : (
    <Feed data={{ quotes }} setPage={_setPage} {...props} />
  );
}

export default FeedContainer;
