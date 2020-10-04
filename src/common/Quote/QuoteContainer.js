import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth } from 'common/hooks/useAuth';
import { useSnack } from 'common/hooks/useSnack';
import { Quote } from './Quote';
import * as api from './api-calls';

export function QuoteContainer({ quote: initialQuote, ...props }) {
  const { user } = useAuth();
  const snack = useSnack();
  const [quote, setQuote] = useState(initialQuote);
  const [isLiking, setIsLiking] = useState(false);

  const baseUrl = window.location.origin.replace(/\/$/, '');
  const resourceUrl = `${baseUrl}/quotes/${quote.id}/${quote.slug}`;

  useEffect(() => {
    if (!user && quote.is_liked === true) {
      setQuote({ ...quote, is_liked: false });
    }
  }, [user, quote]);

  async function toggleLike() {
    if (!user) {
      return props.history.push('/signin');
    }

    setIsLiking(true);

    const apiFunction = !quote.is_liked ? api.likeQuote : api.unlikeQuote;
    const response = await apiFunction(quote);
    const { data } = response.data;
    setQuote(data);
    setIsLiking(false);

    if (data.is_liked) {
      snack.create('Added to favorites.');
    }
  }

  function copyLink() {
    window.navigator.clipboard.writeText(resourceUrl);
    snack.create('Link copied to clipboard.');
  }

  function shareOnFacebook() {
    window.FB.ui({
      method: 'share',
      quote: `${quote.quotation} — ${quote.author}`,
      href: resourceUrl,
    });
  }

  function shareOnTwitter() {
    const text = encodeURIComponent(`${quote.quotation} — ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }

  return (
    <Quote
      quote={quote}
      copyLink={copyLink}
      toggleLike={toggleLike}
      shareOnTwitter={shareOnTwitter}
      shareOnFacebook={shareOnFacebook}
      isLiking={isLiking}
    />
  );
}

QuoteContainer.propTypes = {
  quote: PropTypes.object.isRequired,
  history: PropTypes.object,
};
