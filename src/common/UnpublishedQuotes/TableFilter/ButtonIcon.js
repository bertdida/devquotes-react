import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import { useFilters } from './FiltersContext';

export function ButtonIcon({ onClick }) {
  const { totalSelected } = useFilters();

  return (
    <Tooltip title="Filter Quotes">
      <IconButton aria-label="filter quotes" onClick={onClick}>
        <Badge
          badgeContent={totalSelected === 0 ? null : totalSelected}
          color="secondary"
        >
          <FilterListIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};
