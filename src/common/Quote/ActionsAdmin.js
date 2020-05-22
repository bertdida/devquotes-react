import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export function ActionsAdmin({ confirmDelete, update, ...props }) {
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
      <IconButton onClick={update} aria-label="edit quote">
        <EditIcon />
      </IconButton>

      <IconButton
        onClick={confirmDelete}
        aria-label="open delete confirmation dialog"
      >
        <DeleteIcon />
      </IconButton>

      <IconButton color="inherit" onClick={show} aria-label="open more menu">
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
        <MenuItem onClick={shareOnTwitter} aria-label="share on twitter">
          Share on Twitter
        </MenuItem>

        <MenuItem onClick={shareOnFacebook} aria-label="share on facebook">
          Share on Facebook
        </MenuItem>

        <MenuItem onClick={copyLink} aria-label="copy link">
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
