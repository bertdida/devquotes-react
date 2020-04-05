import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import * as api from './api-calls';

export default function FormContainer(props) {
  const { match } = props;
  const [quote, setQuote] = useState();

  useEffect(() => {
    const quoteId = parseInt(match.params.id);
    if (!Number.isNaN(quoteId)) {
      api.fetchQuote(quoteId).then(response => {
        setQuote(response.data.data);
      });
    } else {
      setQuote();
    }
  }, [match.params.id]);

  return <Form quote={quote} />;
}

FormContainer.propTypes = {
  match: PropTypes.object.isRequired,
};
