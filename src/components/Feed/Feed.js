import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Quote from "../Quote";
import Pagination from "./Pagination";
import { useSnackbar, Snackbar } from "../Snackbar";
import { AuthContext } from "../Auth";

const useStyles = makeStyles({
  buttonWrapper: {
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

function Feed(props) {
  const [user] = useContext(AuthContext);
  const { quotes } = props.data;
  const [open1, openSnackbar1, closeSnackbar1] = useSnackbar(false);
  const [open2, openSnackbar2, closeSnackbar2] = useSnackbar(false);
  const [open3, openSnackbar3, closeSnackbar3] = useSnackbar(false);
  const [toDelete, setToDelete] = useState(null);
  const url = window.location.origin.replace(/\/$/, "");
  const [isDeleting, setIsDeleting] = useState(false);
  const classes = useStyles();

  function handleLike(quote) {
    if (!user) {
      return props.history.push("/signin");
    }

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

  async function handleDelete() {
    setIsDeleting(true);
    await props.deleteQuote(toDelete);
    setIsDeleting(false);
    setToDelete(null);
    openSnackbar3();
  }

  function handleEdit({ id }) {
    return props.history.push(`/quotes/${id}/edit`);
  }

  return (
    <React.Fragment>
      {quotes.data.map(quote => (
        <Quote
          key={quote.data.id}
          quote={quote.data}
          actions={{
            handleLike,
            handleCopyLink,
            shareOnFacebook,
            shareOnTwitter,
            setToDelete,
            handleEdit
          }}
        />
      ))}
      {quotes.curr_page && (
        <Pagination setPage={props.setPage} quotes={quotes} />
      )}
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
      <Snackbar
        open={open3}
        onClose={closeSnackbar3}
        autoHideDuration={1000}
        message="Quote deleted"
      />

      <Dialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Quote?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a Quote will permanently remove it from Devquotes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>No, Keep Quote</Button>
          <div className={classes.buttonWrapper}>
            <Button disabled={isDeleting} onClick={handleDelete}>
              Yes, Delete Quote
            </Button>
            {isDeleting && (
              <CircularProgress
                size={24}
                color="secondary"
                className={classes.buttonProgress}
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Feed;
