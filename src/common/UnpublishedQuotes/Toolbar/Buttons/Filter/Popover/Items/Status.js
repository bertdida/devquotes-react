import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Collapsible } from './Collapsible';
import { useFilters } from '../../Context';

const FILTER_NAME = 'status';

export function Status() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);

  function onChange(event) {
    setValue(FILTER_NAME, event.target.value);
  }

  return (
    <Collapsible title="Status" item={filter}>
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={filter.value} onChange={onChange}>
          {filter.items.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Collapsible>
  );
}
