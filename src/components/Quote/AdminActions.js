import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  like: {
    boxShadow: "none !important",
    marginRight: "auto"
  },
  likeIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

function Actions({ quote, actions }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function show(event) {
    setAnchorEl(event.currentTarget);
  }

  function hide() {
    setAnchorEl(null);
  }

  function _shareOnTwitter() {
    actions.shareOnTwitter(quote);
    hide();
  }

  function _shareOnFacebook() {
    actions.shareOnFacebook(quote);
    hide();
  }

  function _handleCopyLink() {
    actions.handleCopyLink(quote);
    hide();
  }

  return (
    <CardActions>
      <Fab
        size="medium"
        variant="extended"
        color="secondary"
        className={classes.like}
        onClick={() => actions.handleLike(quote)}
      >
        <FavoriteIcon className={classes.likeIcon} />
        22
      </Fab>
      <Tooltip title="Edit">
        <IconButton onClick={() => actions.handleEdit(quote)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => actions.setToDelete(quote)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sharing options">
        <IconButton color="inherit" onClick={show}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={hide}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem onClick={_shareOnTwitter}>Share on Twitter</MenuItem>
        <MenuItem onClick={_shareOnFacebook}>Share on Facebook</MenuItem>
        <MenuItem onClick={_handleCopyLink}>Copy Link</MenuItem>
      </Menu>
    </CardActions>
  );
}

export default Actions;
