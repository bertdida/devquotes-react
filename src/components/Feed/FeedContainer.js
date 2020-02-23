import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";

// prettier-ignore
import { fetchQuotes, fetchLikedQuotes, deleteQuote, updateQuote } from "./api-calls";
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
  }, [user, quotes]);

  useEffect(() => {
    async function _fetchQuotes() {
      const currPage = page || 1;
      let response = {};

      if (props.userLikes) {
        response = await fetchLikedQuotes(currPage);
      } else {
        response = await fetchQuotes(currPage);
      }

      setQuotes(response.data);
      setIsLoading(false);
    }

    _fetchQuotes();
  }, [page, props]);

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

  async function toggleLike({ id, is_liked }) {
    const response = await updateQuote({ id, is_liked: !is_liked });
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
