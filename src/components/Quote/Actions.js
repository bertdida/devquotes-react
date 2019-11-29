import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkIcon from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  like: {
    boxShadow: "none !important",
    marginRight: "auto"
  },
  likeIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

function Actions({ handleLike }) {
  const classes = useStyles();

  return (
    <CardActions>
      <Fab
        size="medium"
        variant="extended"
        color="secondary"
        className={classes.like}
        onClick={handleLike}
      >
        <FavoriteIcon className={classes.likeIcon} />
        22
      </Fab>
      <Tooltip title="Share on Twitter">
        <IconButton>
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <IconButton>
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy link">
        <IconButton>
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}

export default Actions;
