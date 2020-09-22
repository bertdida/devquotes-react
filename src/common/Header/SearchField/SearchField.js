import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { Button } from './Button';
import { Form } from './Form';
import { useStyles } from './SearchField.style';

export function SearchField() {
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();

  function onClick() {
    setShowForm(true);
  }

  function onHide() {
    setShowForm(false);
  }

  return (
    <>
      <Button className={classes.searchIcon} onClick={onClick}>
        <SearchIcon />
      </Button>

      <Form show={showForm} onHide={onHide} />
    </>
  );
}
