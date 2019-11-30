import React from "react";

import { Quote } from "../Quote";
import Pagination from "./Pagination";
import quotes from "./quotes";
import Skeleton from "../Quote/Skeleton";
import { useSnackbar, Snackbar } from "../Snackbar";

function Feed() {
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false);
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false);
  const url = window.location.origin.replace(/\/$/, "");

  function handleLike(quote) {
    closeSnackbar2();
    openSnackbar1();

    console.log(quote);
  }

  function handleCopyLink({ id }) {
    const textField = document.createElement("textarea");
    textField.innerText = `${url}/quotes/${id}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    closeSnackbar1();
    openSnackbar2();
  }

  function shareOnFacebook({ id, author, phrase }) {
    window.FB.ui({
      method: "share",
      quote: `${phrase} — ${author}`,
      href: `${url}/quotes/${id}`
    });
  }

  function shareOnTwitter({ author, phrase }) {
    const text = encodeURIComponent(`${phrase}  — ${author}`);
    window.open("https://twitter.com/intent/tweet?text=" + text, "_blank");
  }

  return (
    <React.Fragment>
      <Skeleton />
      {quotes.map(quote => (
        <Quote
          key={quote.id}
          quote={quote}
          actions={{
            handleLike,
            handleCopyLink,
            shareOnFacebook,
            shareOnTwitter
          }}
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
