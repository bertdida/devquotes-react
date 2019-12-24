import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";

import UserActions from "./UserActions";
import AdminActions from "./AdminActions";

const useStyles = makeStyles(theme => ({
  like: {
    boxShadow: "none !important",
    marginRight: "auto"
  },
  likeIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

function Actions({ user, ...props }) {
  const classes = useStyles();
  const OtherActionsComponent =
    user && user.is_admin ? AdminActions : UserActions;

  return (
    <CardActions>
      <Fab
        size="medium"
        variant="extended"
        color="secondary"
        className={classes.like}
        onClick={() => props.actions.handleLike(props.quote)}
      >
        <FavoriteIcon className={classes.likeIcon} />
        22
      </Fab>
      <OtherActionsComponent {...props} />
    </CardActions>
  );
}

export default Actions;
