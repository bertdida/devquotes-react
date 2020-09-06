import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonIcon } from './ButtonIcon';
import { Popover } from './Popover';
import { FiltersProvider } from './FiltersContext';

export function TableFilter({ onSubmit, onReset }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function onClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function onClose() {
    setAnchorEl(null);
  }

  return (
    <FiltersProvider>
      <ButtonIcon onClick={onClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </FiltersProvider>
  );
}

TableFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
