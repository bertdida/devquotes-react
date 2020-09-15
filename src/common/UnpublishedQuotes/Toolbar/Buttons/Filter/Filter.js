import React, { useState } from 'react';

import { FiltersProvider } from './Context';
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
    <FiltersProvider>
      <Button onClick={onClick} />
      <Popover open={open} anchorEl={anchorEl} onClose={onClose} />
    </FiltersProvider>
  );
}
