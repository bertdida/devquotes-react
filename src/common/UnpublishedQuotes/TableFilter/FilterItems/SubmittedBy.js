import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { CollapsibleListItem } from './CollapsibleListItem';
import { useFilters } from '../FiltersContext';

const FILTER_NAME = 'submittedBy';

export function SubmittedBy() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);

  function onChange(event) {
    setValue(FILTER_NAME, event.target.value);
  }

  return (
    <CollapsibleListItem title="Submitted By" item={filter}>
      <FormControl margin="dense" fullWidth>
        <TextField
          autoFocus
          value={filter.value}
          onChange={onChange}
          placeholder="User name"
        />
      </FormControl>
    </CollapsibleListItem>
  );
}
