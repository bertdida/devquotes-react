import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReCAPTCHA from 'react-google-recaptcha';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { isWebUri } from 'valid-url';

import { useStyles } from './QuoteForm.style';

const QUOTATION_MAX_LENGTH = 200;
const DEFAULT_FORM_VALUES = {
  author: '',
  quotation: '',
  source: null,
};

export const QuoteForm = memo(WrappedQuoteForm);

function WrappedQuoteForm({ quote, onSubmit }) {
  const classes = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM_VALUES);

  useEffect(() => {
    setForm(quote || DEFAULT_FORM_VALUES);
  }, [quote]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isURL', value => {
      if (value === '') {
        return true;
      }

      return isWebUri(value);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    onSubmit(form).then(() => {
      setIsSubmitting(false);
    });
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <Paper className={classes.container}>
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          id="author"
          name="author"
          label="Author"
          margin="normal"
          color="secondary"
          value={form.author}
          onChange={handleChange}
          validators={['required']}
          errorMessages={['Author is required']}
          fullWidth
        />

        <TextValidator
          id="quotation"
          name="quotation"
          label="Quotation"
          multiline
          rows="4"
          margin="normal"
          color="secondary"
          value={form.quotation}
          onChange={handleChange}
          validators={['required']}
          errorMessages={['Quotation is required']}
          inputProps={{ maxLength: QUOTATION_MAX_LENGTH }}
          helperText={`${form.quotation.length}/${QUOTATION_MAX_LENGTH}`}
          fullWidth
        />

        <TextValidator
          id="source"
          name="source"
          label="Source"
          margin="normal"
          color="secondary"
          value={form.source || ''}
          onChange={handleChange}
          validators={['isURL']}
          errorMessages={['Invalid source URL']}
          helperText="The URL of the page with the quote"
          fullWidth
        />

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
            Submit
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
  );
}

WrappedQuoteForm.propTypes = {
  quote: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
