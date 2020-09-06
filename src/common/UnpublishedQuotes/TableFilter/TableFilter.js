import React, { useState } from 'react';

import { ButtonIcon } from './ButtonIcon';
import { Popover } from './Popover';
import { FiltersProvider } from './FiltersContext';

export function TableFilter() {
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
      <Popover open={open} anchorEl={anchorEl} onClose={onClose} />
    </FiltersProvider>
  );
}
