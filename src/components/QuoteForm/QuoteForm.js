import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ReCAPTCHA from 'react-google-recaptcha';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { isWebUri } from 'valid-url';

import { useUserDispatch, useUserState, actions } from 'common/hooks/useUser';
import { useStyles } from './QuoteForm.style';

const STATUS_OPTIONS = [
  {
    text: 'Published',
    value: 'published',
  },
  {
    text: 'Pending Review',
    value: 'pending_review',
  },
  {
    text: 'Spam',
    value: 'spam',
  },
];

const QUOTATION_MAX_LENGTH = 200;
const DEFAULT_FORM_VALUES = {
  author: '',
  quotation: '',
  source: null,
  status: undefined,
};

export function QuoteForm({ quote: quoteProp, onSubmit }) {
  const classes = useStyles();
  const user = useUserState();
  const dispatch = useUserDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quote, setQuote] = useState(DEFAULT_FORM_VALUES);

  const isAdmin = user.is_admin;
  const isCreating = quote.id === undefined;

  useEffect(() => {
    setQuote(quoteProp || DEFAULT_FORM_VALUES);
  }, [quoteProp]);

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

    const response = await onSubmit(quote);
    setIsSubmitting(false);

    if (isCreating) {
      if (response.data.data.status === 'published') {
        dispatch({ type: actions.INCREMENT_SUBMITTED });
      }
    }
  }

  function handleChange(event) {
    setQuote({ ...quote, [event.target.name]: event.target.value });
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
          value={quote.author}
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
          value={quote.quotation}
          onChange={handleChange}
          validators={['required']}
          errorMessages={['Quotation is required']}
          inputProps={{ maxLength: QUOTATION_MAX_LENGTH }}
          helperText={`${quote.quotation.length}/${QUOTATION_MAX_LENGTH}`}
          fullWidth
        />

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

        {isAdmin && !isCreating && (
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="quote-status">Status</InputLabel>
            <Select
              value={quote.status}
              onChange={handleChange}
              inputProps={{
                name: 'status',
                id: 'quote-status',
              }}
            >
              {STATUS_OPTIONS.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

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

QuoteForm.propTypes = {
  quote: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
