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

import api from 'common/api';
import { useUserDispatch, useUserState, actions } from 'common/hooks/useUser';
import { Spinner } from 'components/Spinner';
import { useStyles } from './QuoteForm.style';

const { fetchQuoteStatuses } = api;

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

  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quote, setQuote] = useState(DEFAULT_FORM_VALUES);

  const isAdmin = user.is_admin;
  const isCreating = quoteProp === undefined;

  useEffect(() => {
    if (!isAdmin) {
      setQuote(DEFAULT_FORM_VALUES);
      setIsLoading(false);
      return;
    }

    if (isCreating) {
      setQuote({ ...DEFAULT_FORM_VALUES, status: 'published' });
      setIsLoading(false);
      return;
    }

    (async () => {
      const response = await fetchQuoteStatuses();
      setStatuses(response.data.data.map(({ data }) => data));
      setQuote(quoteProp);
      setIsLoading(false);
    })();
  }, [isAdmin, isCreating, quoteProp]);

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

  if (isLoading) {
    return <Spinner message="Loading form..." />;
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
              {statuses.map(status => (
                <MenuItem key={status.id} value={status.name}>
                  {status.display_name}
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
