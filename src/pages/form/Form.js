import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isWebUri } from 'valid-url';

import { useSnackbar, Snackbar } from 'common/hooks/useSnackbar';
import { useAuth } from 'common/hooks/useAuth';
import * as api from './api-calls';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  buttonWrapper: {
    position: 'relative',
    width: 'fit-content',
    marginTop: theme.spacing(3),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const QUOTATION_LIMIT = 200;
const DEFAULT_QUOTE = {
  author: '',
  quotation: '',
  source: null,
};

export function Form({ quote: initialQuote }) {
  const classes = useStyles();
  const snackbar1 = useSnackbar();
  const snackbar2 = useSnackbar();

  const [isCreating, setIsCreating] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quote, setQuote] = useState(DEFAULT_QUOTE);

  const { user } = useAuth();
  const isAdmin = user && user.is_admin;

  const createText = () => {
    if (!isCreating) {
      return 'Update';
    }

    return isAdmin ? 'Create' : 'Submit';
  };

  const snackbar1Message = () => {
    if (!isCreating) {
      return 'Quote updated.';
    }

    return `Quote ${isAdmin ? 'created' : 'submitted'}.`;
  };

  useEffect(() => {
    setIsCreating(!initialQuote);
    setQuote(initialQuote || DEFAULT_QUOTE);
  }, [initialQuote]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isURL', value => {
      if (value === '') {
        return true;
      }

      return isWebUri(value);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const apiFunction = isCreating ? api.createQuote : api.updateQuote;

    try {
      await apiFunction(quote);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIsSubmitting(false);
        return snackbar2.show();
      }
    }

    setIsSubmitting(false);
    snackbar1.show();

    if (isCreating) {
      setQuote({
        author: '',
        quotation: '',
        source: null,
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
              validators={['required']}
              errorMessages={['Author is required']}
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
              validators={['required']}
              errorMessages={['Quotation is required']}
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
              value={quote.source || ''}
              onChange={handleChange}
              validators={['isURL']}
              errorMessages={['Invalid source URL']}
              helperText="The URL of the page with the quote"
              fullWidth
            />
          </div>

          {process.env.REACT_APP_RECAPTCHA_KEY && (
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
              size="invisible"
            />
          )}

          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {createText()}
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
        open={snackbar1.isShown}
        onClose={snackbar1.onClose}
        autoHideDuration={3000}
        message={snackbar1Message()}
      />

      <Snackbar
        open={snackbar2.isShown}
        onClose={snackbar2.onClose}
        autoHideDuration={3000}
        message="Duplicate entry, quote not created."
      />
    </React.Fragment>
  );
}

Form.propTypes = {
  quote: PropTypes.object,
};
