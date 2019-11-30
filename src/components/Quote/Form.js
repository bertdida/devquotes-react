import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";

import { useSnackbar, Snackbar } from "../Snackbar";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3)
    }
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

function Submit() {
  const classes = useStyles();
  const [open, openSnackbar, closeSnackbar] = useSnackbar(false);

  function handleSubmit(event) {
    event.preventDefault();
    openSnackbar();
  }

  return (
    <React.Fragment>
      <Paper className={classes.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="author"
              name="author"
              label="Author"
              margin="normal"
              color="secondary"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="quotation"
              name="quotation"
              label="Quotation"
              multiline
              rows="4"
              margin="normal"
              color="secondary"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="source"
              name="source"
              label="Source"
              margin="normal"
              color="secondary"
              helperText="The URL of the page with the quote"
              fullWidth
            />
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            size="invisible"
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
      <Snackbar open={open} onClose={closeSnackbar} message="Form submitted" />
    </React.Fragment>
  );
}

export default Submit;
