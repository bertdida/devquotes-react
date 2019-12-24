import React, { useState, useEffect } from "react";

import { fetchQuote, deleteQuote } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";

function SingleContainer(props) {
  const { id: quoteId } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function _fetchQuote() {
      const response = await fetchQuote(quoteId);
      setQuote(response.data);
      setIsLoading(false);
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

  return (
    <Feed
      data={{ quotes: { data: [quote] } }}
      deleteQuote={_deleteQuote}
      {...props}
    />
  );
}

export default SingleContainer;
