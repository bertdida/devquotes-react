import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'common/Auth';
import { useSnackbar, Snackbar } from 'common/Snackbar';
import { Quote } from './Quote';
import { DeleteDialog } from './DeleteDialog';
import * as api from './api-calls';

export function QuoteContainer({ quote: initialQuote, ...props }) {
  const [user] = useContext(AuthContext);
  const [quote, setQuote] = useState(initialQuote);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false); // added to favorites
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false); // copied to clipboard
  const [open3, openSnackbar3, closeSnackbar3] = useSnackbar(false); // deleted

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

    openSnackbar3();
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

    const apiFunction = !quote.is_liked ? api.likeQuote : api.unlikeQuote;
    const response = await apiFunction(quote);
    const { data } = response.data;
    setQuote(data);

    if (data.is_liked) {
      openSnackbar1();
    }
  }

  function copyLink() {
    window.navigator.clipboard.writeText(`${baseUrl}/quotes/${quote.id}`);
    openSnackbar2();
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
      />

      <Snackbar
        open={open1}
        onClose={closeSnackbar1}
        message="Added to favorites."
      />

      <Snackbar
        open={open2}
        onClose={closeSnackbar2}
        message="Link copied to clipboard."
      />

      <Snackbar
        open={open3}
        onClose={closeSnackbar3}
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
