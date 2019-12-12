import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useSnackbar, Snackbar } from "../Snackbar";
import { createQuote, updateQuote } from "./api-calls";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3)
    }
  },
  buttonWrapper: {
    position: "relative",
    width: "fit-content",
    marginTop: theme.spacing(3)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

function Form(props) {
  const QUOTATION_LIMIT = 200;
  const classes = useStyles();
  const [open, openSnackbar, closeSnackbar] = useSnackbar(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(true);
  const [quote, setQuote] = useState({
    author: "",
    quotation: "",
    source: ""
  });

  useEffect(() => {
    const { quote: _quote } = props.data || {};
    if (_quote) {
      setQuote(quote => ({ ...quote, ..._quote.data }));
      setIsCreating(false);
    }
  }, [props.data]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isURL", value => {
      if (value === "") {
        return true;
      }

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
    setIsSubmitting(true);

    if (isCreating) {
      await createQuote(quote);
    } else {
      await updateQuote(quote);
    }

    setIsSubmitting(false);
    openSnackbar();

    if (isCreating) {
      setQuote({
        author: "",
        quotation: "",
        source: ""
      });
    }
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

          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {isCreating ? "Create" : "Update"}
            </Button>
            {isSubmitting && (
              <CircularProgress
                size={24}
                color="secondary"
                className={classes.buttonProgress}
              />
            )}
          </div>
        </ValidatorForm>
      </Paper>
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={3000}
        message={"Quote " + (isCreating ? "created!" : "updated!")}
      />
    </React.Fragment>
  );
}

export default Form;
