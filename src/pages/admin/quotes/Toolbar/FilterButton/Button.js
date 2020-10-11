import React from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import { useFilterState } from './FilterContext';

export function Button({ onClick }) {
  const state = useFilterState();
  const selected = state.filter(({ isSelected }) => isSelected);
  const badgeContent = selected.length === 0 ? null : selected.length;

  return (
    <Tooltip title="Filter Quotes">
      <IconButton aria-label="filter quotes" onClick={onClick}>
        <Badge badgeContent={badgeContent} color="secondary">
          <FilterListIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

Button.propTypes = {
  onClick: Proptypes.func.isRequired,
};
