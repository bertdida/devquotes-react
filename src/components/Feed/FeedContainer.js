import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";
import { Helmet } from "react-helmet";

import * as api from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";
import { AuthContext } from "../Auth";

function FeedContainer({ isFavoritesPage, ...props }) {
  const [user] = useContext(AuthContext);
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { page: initialPage } = queryString.parse(props.location.search);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (user || !quotes.data) {
      return;
    }

    if (!quotes.data.some(({ data }) => data.is_liked)) {
      return;
    }

    // is_liked value to false if no user is signed in
    const newQuoteData = quotes.data.map(quote => {
      return { ...quote, data: { ...quote.data, is_liked: false } };
    });

    setQuotes({ ...quotes, data: newQuoteData });
  }, [user, quotes]);

  useEffect(() => {
    async function _fetchQuotes() {
      const currPage = page || 1;
      const apiFunction = isFavoritesPage
        ? api.fetchLikedQuotes
        : api.fetchQuotes;

      const response = await apiFunction(currPage);
      setQuotes(response.data);
      setIsLoading(false);
    }

    _fetchQuotes();
  }, [page, isFavoritesPage]);

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
    await api.deleteQuote(id);
    const response = await api.fetchQuotes(quotes.curr_page);
    setQuotes(response.data);
    callback();
  }

  async function toggleLike(quote) {
    const apiFunction = !quote.is_liked ? api.likeQuote : api.unlikeQuote;
    const response = await apiFunction(quote);
    const { data } = response.data;

    setQuotes({
      ...quotes,
      data: quotes.data.map(({ data: currData }) => {
        return { data: currData.id === data.id ? data : currData };
      })
    });
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <React.Fragment>
      {isFavoritesPage && (
        <Helmet>
          <title>DevQuotes | Favorites</title>
        </Helmet>
      )}

      <Feed
        data={{ quotes }}
        setPage={_setPage}
        deleteQuote={_deleteQuote}
        toggleLike={toggleLike}
        {...props}
      />
    </React.Fragment>
  );
}

export default FeedContainer;
