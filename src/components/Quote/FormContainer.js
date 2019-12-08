import React, { useEffect, useState } from "react";

import Form from "./Form";
import { fetchQuote } from "./api-calls";

function FormContainer(props) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function _getQuote() {
      const response = await fetchQuote(quoteId);
      setQuote(response.data);
    }

    const quoteId = parseInt(props.match.params.quoteId);
    !isNaN(quoteId) && _getQuote();
  }, [props.match.params.quoteId]);

  return <Form data={{ quote }} />;
}

export default FormContainer;
