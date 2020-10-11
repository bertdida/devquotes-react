import React from 'react';
import PropTypes from 'prop-types';

import { Quote as QuoteItem } from 'components/Quote';

export function Quote({ quote, ...props }) {
  return <QuoteItem quote={quote} {...props} />;
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
};
