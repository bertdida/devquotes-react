import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { CollapsibleListItem } from './CollapsibleListItem';
import { statuses } from '../options';
import { useFilters } from '../FiltersContext';

const FILTER_NAME = 'status';

export function Status() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);

  function onChange(event) {
    setValue(FILTER_NAME, event.target.value);
  }

  return (
    <CollapsibleListItem title="Status" item={filter}>
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={filter.value} onChange={onChange}>
          {statuses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CollapsibleListItem>
  );
}
