import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth } from 'common/hooks/useAuth';
import { useSnackbar, Snackbar } from 'common/hooks/useSnackbar';
import { Quote } from './Quote';
import { DeleteDialog } from './DeleteDialog';
import * as api from './api-calls';

export function QuoteContainer({ quote: initialQuote, ...props }) {
  const { user } = useAuth();
  const [quote, setQuote] = useState(initialQuote);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const snackbar1 = useSnackbar(false); // added to favorites
  const snackbar2 = useSnackbar(false); // copied to clipboard
  const snackbar3 = useSnackbar(false); // deleted

  const baseUrl = window.location.origin.replace(/\/$/, '');

  useEffect(() => {
    if (!user && quote.is_liked === true) {
      setQuote({ ...quote, is_liked: false });
    }
  }, [user, quote]);

  function confirmDelete() {
    setOpenDeleteDialog(true);
  }

  async function erase() {
    await api.deleteQuote(quote.id);

    snackbar3.show();
    setIsDeleted(true);
    setOpenDeleteDialog(false);
  }

  async function update() {
    return props.history.push(`/quotes/${quote.id}/edit`);
  }

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
      snackbar1.show();
    }
  }

  function copyLink() {
    window.navigator.clipboard.writeText(`${baseUrl}/quotes/${quote.id}`);
    snackbar2.show();
  }

  function shareOnFacebook() {
    window.FB.ui({
      method: 'share',
      quote: `${quote.quotation} — ${quote.author}`,
      href: `${baseUrl}/quotes/${quote.id}`,
    });
  }

  function shareOnTwitter() {
    const text = encodeURIComponent(`${quote.quotation} — ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }

  return (
    <React.Fragment>
      <Quote
        quote={quote}
        isDeleted={isDeleted}
        update={update}
        confirmDelete={confirmDelete}
        copyLink={copyLink}
        toggleLike={toggleLike}
        shareOnTwitter={shareOnTwitter}
        shareOnFacebook={shareOnFacebook}
        isLiking={isLiking}
      />

      <Snackbar
        open={snackbar1.isShown}
        onClose={snackbar1.onClose}
        message="Added to favorites."
      />

      <Snackbar
        open={snackbar2.isShown}
        onClose={snackbar2.onClose}
        message="Link copied to clipboard."
      />

      <Snackbar
        open={snackbar3.isShown}
        onClose={snackbar3.onClose}
        message="Quote deleted."
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        erase={erase}
      />
    </React.Fragment>
  );
}

QuoteContainer.propTypes = {
  quote: PropTypes.object.isRequired,
  history: PropTypes.object,
};
