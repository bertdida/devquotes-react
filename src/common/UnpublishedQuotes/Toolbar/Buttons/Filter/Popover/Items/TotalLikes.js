import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { Collapsible } from './Collapsible';
import { parseLikesValue } from '../../utils';
import { useFilterState, useFilterDispatch, actions } from '../../Context';

const FILTER_NAME = 'likes';

export function TotalLikes() {
  const state = useFilterState();
  const dispatch = useFilterDispatch();
  const filter = state.find(({ name }) => name === FILTER_NAME);

  const [selected, value] = parseLikesValue(filter.value);
  const [newValue, setNewValue] = useState(null);

  useEffect(() => {
    if (newValue !== null) {
      const payload = { id: filter.id, value: newValue };
      dispatch({ type: actions.SET_VALUE, payload });
    }
  }, [dispatch, filter.id, newValue]);

  function onChangeSelect(event) {
    setNewValue(`${event.target.value}${value}`);
  }

  function onChangeInput(event) {
    if (event.target.validity.valid) {
      setNewValue(`${selected}${event.target.value}`);
    }
  }

  const { errors } = filter;
  const hasError = errors && errors.length > 0;

  return (
    <Collapsible title="Total Likes" item={filter}>
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={selected} onChange={onChangeSelect}>
          {filter.items.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="dense" fullWidth>
        <TextField
          InputProps={{
            inputProps: {
              pattern: '[0-9]+',
            },
          }}
          type="tel"
          value={value}
          onChange={onChangeInput}
          error={hasError}
          helperText={hasError && errors[0]}
        />
      </FormControl>
    </Collapsible>
  );
}
