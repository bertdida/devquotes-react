import React, { useState, useEffect } from "react";

import { fetchQuote, deleteQuote, updateQuote } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";

function SingleContainer(props) {
  const { id: quoteId } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function _fetchQuote() {
      try {
        const response = await fetchQuote(quoteId);
        setQuote(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          return props.history.push("/404");
        }
      }
    }

    _fetchQuote();
  }, [quoteId]);

  async function _deleteQuote({ id }) {
    await deleteQuote(id);
    return props.history.push("/");
  }

  if (isLoading) {
    return <Skeleton />;
  }

  async function toggleLike({ id, is_liked }) {
    const response = await updateQuote({ id, is_liked: !is_liked });
    const { data } = response.data;
    setQuote({ ...quote, data });
  }

  return (
    <Feed
      data={{ quotes: { data: [quote] } }}
      deleteQuote={_deleteQuote}
      toggleLike={toggleLike}
      {...props}
    />
  );
}

export default SingleContainer;
