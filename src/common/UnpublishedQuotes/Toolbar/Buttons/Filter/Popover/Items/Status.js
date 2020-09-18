import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Collapsible } from './Collapsible';
import { useFilterDispatch, actions } from '../../Context';

export function Status({ filter }) {
  const dispatch = useFilterDispatch();

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

Status.propTypes = {
  filter: PropTypes.object.isRequired,
};

export const MemoizedStatus = memo(Status);
