import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { Collapsible } from './Collapsible';
import { useFilters } from '../../Context';
import { parseLikesValue } from '../../utils';

const FILTER_NAME = 'likes';

export function TotalLikes() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);
  const [selected, value] = parseLikesValue(filter.value);

  function onChangeSelect(event) {
    setValue(FILTER_NAME, `${event.target.value}${value}`);
  }

  function onChangeInput(event) {
    if (event.target.validity.valid) {
      setValue(FILTER_NAME, `${selected}${event.target.value}`);
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
