import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ActionsAdmin({ confirmDelete, update, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function show(event) {
    setAnchorEl(event.currentTarget);
  }

  function hideMenu() {
    setAnchorEl(null);
  }

  function shareOnTwitter() {
    props.shareOnTwitter();
    hideMenu();
  }

  function shareOnFacebook() {
    props.shareOnFacebook();
    hideMenu();
  }

  function copyLink() {
    props.copyLink();
    hideMenu();
  }

  return (
    <React.Fragment>
      <IconButton onClick={update} data-testid="button-edit">
        <EditIcon />
      </IconButton>

      <IconButton onClick={confirmDelete} data-testid="button-delete">
        <DeleteIcon />
      </IconButton>

      <IconButton color="inherit" onClick={show} data-testid="button-menu">
        <MoreIcon />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={hideMenu}
        keepMounted
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          data-testid="menu-item-twitter-share"
          onClick={shareOnTwitter}
        >
          Share on Twitter
        </MenuItem>

        <MenuItem
          data-testid="menu-item-facebook-share"
          onClick={shareOnFacebook}
        >
          Share on Facebook
        </MenuItem>

        <MenuItem data-testid="menu-item-copy-link" onClick={copyLink}>
          Copy Link
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

ActionsAdmin.propTypes = {
  shareOnTwitter: PropTypes.func.isRequired,
  shareOnFacebook: PropTypes.func.isRequired,
  copyLink: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};
