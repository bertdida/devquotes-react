import React, { useContext } from "react";

import Quote from "../Quote";
import Pagination from "./Pagination";
import Skeleton from "../Quote/Skeleton";
import { useSnackbar, Snackbar } from "../Snackbar";
import { AuthContext } from "../Auth";

function Feed(props) {
  const [user] = useContext(AuthContext);
  const { quotes } = props.data;
  const showPagination = quotes.length > 1;
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false);
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false);
  const url = window.location.origin.replace(/\/$/, "");

  function handleLike(quote) {
    if (!user) {
      return props.history.push("/signin");
    }

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

  function shareOnFacebook({ id, author, quotation }) {
    window.FB.ui({
      method: "share",
      quote: `${quotation} — ${author}`,
      href: `${url}/quotes/${id}`
    });
  }

  function shareOnTwitter({ author, quotation }) {
    const text = encodeURIComponent(`${quotation}  — ${author}`);
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
      {showPagination && <Pagination />}
      <Snackbar
        open={open1}
        onClose={closeSnackbar1}
        autoHideDuration={1000}
        message="Added to favorites"
      />
      <Snackbar
        open={open2}
        onClose={closeSnackbar2}
        autoHideDuration={1000}
        message="Link copied to clipboard"
      />
    </React.Fragment>
  );
}

export default Feed;
