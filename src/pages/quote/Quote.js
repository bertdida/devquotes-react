import React from 'react';
import PropTypes from 'prop-types';

import QuoteContainer from 'common/Quote';

export default function Quote({ quote, ...props }) {
  return <QuoteContainer quote={quote} {...props} />;
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
};
