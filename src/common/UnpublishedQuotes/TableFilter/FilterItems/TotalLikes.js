import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { CollapsibleListItem } from './CollapsibleListItem';
import { likesOperators } from '../options';
import { useFilters } from '../FiltersContext';

const FILTER_NAME = 'likes';

function parseValue(value) {
  const { groups } = /^(?<operator>[g|l|e]t)(?<value>\d*)$/.exec(value);
  return [groups.operator, groups.value];
}

export function TotalLikes() {
  const { get, setValue } = useFilters();
  const filter = get(FILTER_NAME);
  const [selected, value] = parseValue(filter.value);

  function onChangeSelect(event) {
    setValue(FILTER_NAME, `${event.target.value}${value}`);
  }

  function onChangeInput(event) {
    if (event.target.validity.valid) {
      setValue(FILTER_NAME, `${selected}${event.target.value}`);
    }
  }

  return (
    <CollapsibleListItem title="Total Likes" item={filter}>
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={selected} onChange={onChangeSelect}>
          {likesOperators.map(option => (
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
        />
      </FormControl>
    </CollapsibleListItem>
  );
}
