import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { Collapsible } from './Collapsible';
import { useFilterState, useFilterDispatch, actions } from '../../Context';

const FILTER_NAME = 'submitted_by';

export function SubmittedBy() {
  const state = useFilterState();
  const dispatch = useFilterDispatch();
  const filter = state.find(({ name }) => name === FILTER_NAME);

  function onChange(event) {
    const payload = { id: filter.id, value: event.target.value };
    dispatch({ type: actions.SET_VALUE, payload });
  }

  const { errors } = filter;
  const hasError = errors && errors.length > 0;

  return (
    <Collapsible title="Submitted By" item={filter}>
      <FormControl margin="dense" fullWidth>
        <TextField
          autoFocus
          value={filter.value}
          onChange={onChange}
          placeholder="User name"
          error={hasError}
          helperText={hasError && errors[0]}
        />
      </FormControl>
    </Collapsible>
  );
}
