import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useSnackbar, Snackbar } from "../Snackbar";
import { createQuote } from "./api-calls";

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

function Form(props) {
  const QUOTATION_LIMIT = 200;
  const classes = useStyles();
  const [open, openSnackbar, closeSnackbar] = useSnackbar(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCreating, setIsCreating] = useState(true);
  const [quote, setQuote] = useState({
    author: "",
    quotation: "",
    source: ""
  });

  useEffect(() => {
    const { quote: _quote } = props.data || {};
    if (_quote) {
      setQuote(quote => ({ ...quote, ..._quote }));
      setIsCreating(false);
    }
  }, [props.data]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isURL", value => {
      try {
        new URL(value);
        return true;
      } catch (_) {
        return false;
      }
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await createQuote(quote);
    setIsSubmitted(true);
    openSnackbar();
  }

  function handleChange(event) {
    setQuote({ ...quote, [event.target.name]: event.target.value });
  }

  return (
    <React.Fragment>
      <Paper className={classes.container}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div>
            <TextValidator
              id="author"
              name="author"
              label="Author"
              margin="normal"
              color="secondary"
              value={quote.author}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Author is required"]}
              fullWidth
            />
          </div>
          <div>
            <TextValidator
              id="quotation"
              name="quotation"
              label="Quotation"
              multiline
              rows="4"
              margin="normal"
              color="secondary"
              value={quote.quotation}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Quotation is required"]}
              inputProps={{ maxLength: QUOTATION_LIMIT }}
              helperText={`${quote.quotation.length}/${QUOTATION_LIMIT}`}
              fullWidth
            />
          </div>
          <div>
            <TextValidator
              id="source"
              name="source"
              label="Source"
              margin="normal"
              color="secondary"
              value={quote.source}
              onChange={handleChange}
              validators={["required", "isURL"]}
              errorMessages={["Source is required", "Invalid source URL"]}
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
            disabled={isSubmitted}
          >
            {isCreating ? "Create" : "Update"}
          </Button>
        </ValidatorForm>
      </Paper>
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={3000}
        message="Quote created!"
      />
    </React.Fragment>
  );
}

export default Form;
