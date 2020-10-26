import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import { NavList } from './NavList';
import { UserCard } from './UserCard';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '75%',
  },

  [theme.breakpoints.up('sm')]: {
    drawer: {
      maxWidth: 280,
    },
  },
}));

export function NavDrawer() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = state => (event = {}) => {
    const { type, key } = event;
    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return;
    }

    setIsOpen(state);
  };

  return (
    <>
      <IconButton
        edge="start"
        aria-label="open main navigation"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className: classes.drawer,
        }}
      >
        <UserCard onClose={toggleDrawer(false)} />
        <Divider />
        <NavList onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
}
