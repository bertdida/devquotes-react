import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Collapsible } from './Collapsible';
import { useFilterState, useFilterDispatch, actions } from '../../Context';

const FILTER_NAME = 'status';

export function Status() {
  const state = useFilterState();
  const dispatch = useFilterDispatch();
  const filter = state.find(({ name }) => name === FILTER_NAME);

  function onChange(event) {
    const payload = { id: filter.id, value: event.target.value };
    dispatch({ type: actions.SET_VALUE, payload });
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
