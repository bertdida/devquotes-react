import React from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import { useFilterState } from './FilterContext';

export function Button({ onClick }) {
  const { isLoading, options } = useFilterState();
  const selected = options.filter(({ isSelected }) => isSelected);
  const badgeContent = selected.length === 0 ? null : selected.length;

  return (
    <ButtonWrapper isLoading={isLoading}>
      <IconButton
        onClick={onClick}
        disabled={isLoading}
        aria-label="filter quotes"
      >
        <Badge badgeContent={badgeContent} color="secondary">
          <FilterListIcon />
        </Badge>
      </IconButton>
    </ButtonWrapper>
  );
}

Button.propTypes = {
  onClick: Proptypes.func.isRequired,
};

function ButtonWrapper({ isLoading, children }) {
  if (isLoading) {
    return <div>{children}</div>;
  }

  return <Tooltip title="Filter Quotes">{children}</Tooltip>;
}

ButtonWrapper.propTypes = {
  isLoading: Proptypes.bool.isRequired,
  children: Proptypes.node.isRequired,
};
