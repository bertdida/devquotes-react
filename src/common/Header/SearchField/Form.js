import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

import { Button } from './Button';
import { Results } from './Results';
import { searchQuote } from './api-calls';
import { useStyles } from './SearchField.style';
import { useOnClickOutside } from './useOnClickOutside';

function isEmptyString(string) {
  return string.length === 0 && !string.trim();
}

export function Form({ show, onHide }) {
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
    if (hasQuery) reset();
    focusInput();
  }

  function onClickBack() {
    onHide();
    reset();
  }

  function onClickOutside() {
    setShowResults(false);
  }

  function onFocus() {
    setShowResults(true);
  }

  function focusInput() {
    inputRef.current.focus();
  }

  function reset() {
    setQuery('');
    setResults(null);
  }

  return (
    <form
      ref={form}
      className={clsx({
        [classes.form]: true,
        [`${classes.form}--isShown`]: show,
      })}
    >
      <InputBase
        autoFocus
        fullWidth
        inputRef={inputRef}
        placeholder="Search"
        inputProps={{
          'aria-label': 'search',
          className: `${classes.form}__input`,
        }}
        className={`${classes.form}__inputRoot`}
        value={query}
        onFocus={onFocus}
        onChange={onChange}
        startAdornment={
          <>
            <Button
              disableHoverEffect
              className={`${classes.form}__backIcon`}
              onClick={onClickBack}
            >
              <ArrowBackIcon />
            </Button>

            <Button
              disableHoverEffect
              className={`${classes.form}__searchIcon`}
              onClick={focusInput}
            >
              <SearchIcon />
            </Button>
          </>
        }
        endAdornment={
          hasQuery && (
            <Button disableHoverEffect onClick={onClear}>
              <ClearIcon />
            </Button>
          )
        }
      />

      {showResults && <Results results={results} />}
    </form>
  );
}

Form.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
