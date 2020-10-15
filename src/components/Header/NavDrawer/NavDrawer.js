import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { NavList } from './NavList';

const NAV_DRAWER_WIDTH = 250;

export function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = state => event => {
    const { type, key } = event;
    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return;
    }

    setIsOpen(state);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="open main navigation"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <NavList onClose={toggleDrawer(false)} width={NAV_DRAWER_WIDTH} />
      </Drawer>
    </React.Fragment>
  );
}
