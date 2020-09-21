import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Results } from './Results';
import { searchQuote } from './api-calls';
import { useStyles } from './SearchField.style';
import { useOnClickOutside } from './useOnClickOutside';

function isEmptyString(string) {
  return string.length === 0 && !string.trim();
}

function Button({ children, ...rest }) {
  const classes = useStyles();

  return (
    <IconButton
      disableRipple
      className={clsx(classes.button, classes.colorInherit)}
      {...rest}
    >
      {children}
    </IconButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export function SearchField({ onHide }) {
  const form = useRef();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState();

  useOnClickOutside(form, onClickOutside);

  const inputRef = useRef();
  const classes = useStyles();
  const hasQuery = !isEmptyString(query);

  function onChange(event) {
    const { value } = event.target;
    setQuery(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (isEmptyString(value)) {
      setResults(null);
      return;
    }

    setTypingTimeout(
      setTimeout(async () => {
        const response = await searchQuote(value);
        const { data } = response.data;
        setResults(data.map(quote => quote.data));
      }, 1000)
    );
  }

  function onClear() {
    if (hasQuery) {
      setQuery('');
      setResults(null);
    }

    inputRef.current.focus();
  }

  function onClickOutside() {
    setShowResults(false);
  }

  function onFocus() {
    setShowResults(true);
  }

  return (
    <form className={classes.form} ref={form}>
      <InputBase
        autoFocus
        fullWidth
        inputRef={inputRef}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        className={classes.colorInherit}
        value={query}
        onFocus={onFocus}
        onChange={onChange}
        startAdornment={
          <Button onClick={onHide}>
            <ArrowBackIcon />
          </Button>
        }
        endAdornment={
          hasQuery && (
            <Button onClick={onClear}>
              <ClearIcon />
            </Button>
          )
        }
      />

      {showResults && <Results results={results} />}
    </form>
  );
}

SearchField.propTypes = {
  onHide: PropTypes.func.isRequired,
};
