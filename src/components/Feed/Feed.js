import React from "react";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";
import Skeleton from "../Quote/Skeleton";
import { useSnackbar, Snackbar } from "../Snackbar";

function Feed() {
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false);
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false);

  function handleLike() {
    closeSnackbar2();
    openSnackbar1();
  }

  function handleCopyLink() {
    closeSnackbar1();
    openSnackbar2();
  }

  return (
    <React.Fragment>
      <Skeleton />
      {quotes.map(quote => (
        <Quote
          key={quote.id}
          quote={quote}
          handleLike={handleLike}
          handleCopyLink={handleCopyLink}
        />
      ))}
      <Pagination />
      <Snackbar
        open={open1}
        onClose={closeSnackbar1}
        message="Added to favorites"
      />
      <Snackbar
        open={open2}
        onClose={closeSnackbar2}
        message="Link copied to clipboard"
      />
    </React.Fragment>
  );
}

export default Feed;
