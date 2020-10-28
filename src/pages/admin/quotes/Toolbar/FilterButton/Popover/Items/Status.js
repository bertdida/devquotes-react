import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Collapsible } from './Collapsible';
import { useFilterDispatch, actions } from '../../FilterContext';

export const Status = memo(WrappedStatus);

export function WrappedStatus({ filter }) {
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
            <MenuItem key={option.id} value={option.name}>
              {option.display_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Collapsible>
  );
}

WrappedStatus.propTypes = {
  filter: PropTypes.object.isRequired,
};
