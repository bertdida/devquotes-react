import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { Collapsible } from './Collapsible';
import { useFilterDispatch, actions } from '../../FilterContext';

export const SubmittedBy = memo(WrappedSubmittedBy);

export function WrappedSubmittedBy({ filter }) {
  const dispatch = useFilterDispatch();

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

WrappedSubmittedBy.propTypes = {
  filter: PropTypes.object.isRequired,
};
