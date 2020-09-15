import React from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import { useFilters } from './Context';

export function Button({ onClick }) {
  const { totalSelected } = useFilters();
  const badgeContent = totalSelected === 0 ? null : totalSelected;

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
