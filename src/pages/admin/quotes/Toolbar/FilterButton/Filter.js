import React, { useState } from 'react';

import { FilterProvider } from './FilterContext';
import { Popover } from './Popover';
import { Button } from './Button';

export function Filter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function onClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function onClose() {
    setAnchorEl(null);
  }

  return (
    <FilterProvider>
      <Button onClick={onClick} />
      <Popover open={open} anchorEl={anchorEl} onClose={onClose} />
    </FilterProvider>
  );
}
