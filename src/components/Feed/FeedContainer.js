import React, { useEffect, useState } from "react";

import { fetchQuotes } from "./api-calls";
import Feed from "./Feed";
import Skeleton from "../Quote/Skeleton";

function FeedContainer() {
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function _fetchQuotes() {
      const response = await fetchQuotes();
      setQuotes(response.data.data);
      setIsLoading(false);
    }

    _fetchQuotes();
  }, []);

  return isLoading ? <Skeleton /> : <Feed data={{ quotes }} />;
}

export default FeedContainer;
