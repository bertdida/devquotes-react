import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { Collapsible } from './Collapsible';
import { useFilters } from '../../Context';

const FILTER_NAME = 'submitted_by';

export function SubmittedBy() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);

  function onChange(event) {
    setValue(FILTER_NAME, event.target.value);
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
